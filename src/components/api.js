export function fetchImg(search, page) { 
  const API_KEY = '29899357-fb56e1b3516b55b25477bf57b'
  const OPTION = 'image_type=photo&orientation=horizontal&safesearch=true&lang=en&lang=uk&per_page=12'

  return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${search}&${OPTION}&page=${page}`)
    .then(res => { 
    return res.json()
  }).then(res => { 
    if (res.totalHits === 0) { 
      return Promise.reject (new Error())
    }
    return res
  })
}







