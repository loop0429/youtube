$(async function() {
  const API_URI = 'https://www.googleapis.com/youtube/v3/'
  const API_KEY = 'YOUR_API_KEY'
  let isSearching = false

  // 指定されたリクエスト・パラメータからレスポンスを返す
  function fetchYoutubeData(request, params) {
    const requestData = params

    // keyは固定
    requestData['key'] = API_KEY;

    // rejectは書いてない
    return new Promise((resolve) => {
      $.ajax({
        type: 'GET',
        url: API_URI + request,
        data: requestData,
        dataType: 'jsonp'
      }).then((data) => {
        resolve(data)
      })
    })
  }

  // 読み込みボタン押下時
  $('#js-btnSearch').on('click', async () => {
    // 検索中は無反応
    if (isSearching) return

    isSearching = true
    const youtubeURL = $('#search').val()

    if (!youtubeURL) {
      alert('URLが入力されていません')
      return
    }

    // パラメータの形成
    const param = {
      part: 'contentDetails'
    }

    // URLの末尾を取得
    const pathname = youtubeURL.split('/')[youtubeURL.split('/').length - 1]

    // 検索結果で/userと/channelどちらかがでるらしいので、どちらにも対応する
    if(youtubeURL.indexOf('/channel/') != -1) {
      param['id'] = pathname
    } else if(youtubeURL.indexOf('/user/') != -1) {
      param['forUsername'] = pathname
    } else {
      // /userか/channelが含まれていなかったら不正
      alert('URLが正しいか確認してください')
      return
    }

    // すでに動画を読み込み済みの場合はクリア
    if($('#js-youtube').find('li').length) {
      $('#js-youtube').empty()
    }

    // チャンネル情報を取得
    const channelData = await fetchYoutubeData('channels', param)

    // 取得したデータからアップロード済み動画のプレイリストのIDを取得
    const playlistId = channelData['items'][0]['contentDetails']['relatedPlaylists']['uploads']
    const results = $('#results').val()

    // プレイリスト情報の取得
    const movies = await fetchYoutubeData('playlistItems', {
      part: 'contentDetails',
      playlistId: playlistId,
      maxResults: results
    })

    // 動画IDを使用してiframeを生成する
    movies['items'].forEach((item) => {
      const movieId = item['contentDetails']['videoId']

      let str = '<li class="w-50-ns">'
      str += '<div class="movie">'
      str += '<iframe src="https://www.youtube.com/embed/' + movieId + '" frameborder="0" allowfullscreen>'
      str += '</div>'
      str += '</li>'

      $('#js-youtube').append(str)
    })

    isSearching = false
  })
}())
