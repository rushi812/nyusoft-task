import axios from 'axios'

export const addRecordsApi = (records) => {
  let url = 'http://dev.nyusoft.in/nyusoft-practical/backend/api/postData'

  let form_data = new FormData()
  form_data.append('name', records.name)
  form_data.append('email', records.email)
  form_data.append('phone', records.phone)
  form_data.append('gender', records.gender)
  form_data.append('education', records.education)
  form_data.append('hobby', records.hobby)
  form_data.append('experience', records.experience)
  form_data.append('profileimg', records.profileimg, records.profileimg.name)
  form_data.append('message', records.message)

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

export const deleteRecordsApi = (id) => {
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

export const updatedRecordsApi = (records) => {
  let url = 'http://dev.nyusoft.in/nyusoft-practical/backend/api/editData'

  let form_data = new FormData()
  form_data.append('name', records.name)
  form_data.append('email', records.email)
  form_data.append('phone', records.phone)
  form_data.append('gender', records.gender)
  form_data.append('education', records.education)
  form_data.append('hobby', records.hobby)
  form_data.append('experience', records.experience)
  form_data.append('profileimg', records.profileimg, records.profileimg.name)
  form_data.append('message', records.message)

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
