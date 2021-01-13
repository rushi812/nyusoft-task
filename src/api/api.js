import axios from 'axios'

export const addDetailsApi = (details) => {
  let url = 'http://dev.nyusoft.in/nyusoft-practical/backend/api/postData'

  let form_data = new FormData()
  form_data.append('name', details.name)
  form_data.append('email', details.email)
  form_data.append('phone', details.phone)
  form_data.append('gender', details.gender)
  form_data.append('education', details.education)
  form_data.append('hobby', details.hobby)
  form_data.append('experience', details.experience)
  form_data.append('profileimg', details.profileimg, details.profileimg.name)
  form_data.append('message', details.message)

  return axios
    .post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log('RB:: res', res)
    })
}

export const getAllRecordsApi = (searchText, limit, offset) => {
  let url = 'http://dev.nyusoft.in/nyusoft-practical/backend/api/getRecord'

  let form_data = new FormData()
  form_data.append('search_text', searchText)
  form_data.append('limit', limit)
  form_data.append('offset', offset)

  return axios
    .post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((res) => {
      if (res.status === 200 && res.data.data.length > 0) {
        return res.data.data
      }
    })
}

export const deleteDetailsApi = (id) => {
  let url = 'http://dev.nyusoft.in/nyusoft-practical/backend/api/deleteData'

  let form_data = new FormData()
  form_data.append('id', id)

  return axios
    .post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((res) => {
      if (res.status === 200) {
        console.log('RB:: res', res)
      }
    })
}

export const updatedDetailsApi = (details) => {
  let url = 'http://dev.nyusoft.in/nyusoft-practical/backend/api/editData'

  let form_data = new FormData()
  form_data.append('name', details.name)
  form_data.append('email', details.email)
  form_data.append('phone', details.phone)
  form_data.append('gender', details.gender)
  form_data.append('education', details.education)
  form_data.append('hobby', details.hobby)
  form_data.append('experience', details.experience)
  form_data.append('profileimg', details.profileimg, details.profileimg.name)
  form_data.append('message', details.message)

  return axios
    .post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((res) => {
      if (res.status === 200) {
        console.log('RB:: res', res)
      }
    })
}
