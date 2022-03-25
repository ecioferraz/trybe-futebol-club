export const loginMocks = {
  modelResponse: {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  },
  invalidLogin: {
    email: 'invalid.email.com',
    password: 'invalid_password',
  },
  validAdminLogin: {
    email: 'admin@admin.com',
    password: 'secret_admin',
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjQ4MjE2MDk0LCJleHAiOjE2NDg4MjA4OTR9.tx4p21vG8fUXCvPsm__RDkRo0pQfU7sE4VQXuuJ7gx4',
};
