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
};
