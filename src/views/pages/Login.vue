<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="5">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CToaster placement="top-end">
                    <CToast
                      v-for="(toast, index) in form.error"
                      :key="index.id"
                    >
                      <CToastHeader closeButton>
                        <span class="me-auto fw-bold">{{ toast.title }}</span>
                      </CToastHeader>
                      <CToastBody>
                        {{ toast.content }}
                      </CToastBody>
                    </CToast>
                  </CToaster>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="form.email"
                      placeholder="Email"
                      autocomplete="email"
                      feedbackInvalid="Please provide a valid Email"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="form.password"
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      required
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <div class="btn4">
                        <CButton color="primary" class="px-4" @click="login">
                          <span> Login</span>
                        </CButton>
                        <CButton v-if="loading">
                          <CSpinner
                            component="span"
                            size="sm"
                            aria-hidden="true"
                          />
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
const dataR = []

export default {
  name: 'Login',
  dataR,
  data() {
    return {
      form: {
        email: '',
        password: '',
        error: [],
        showtoast: false,
      },
      loading: false,
    }
  },

  methods: {
    async login() {
      // this.loading = !false

      this.spinner()

      const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

      if (this.form.email.match(pattern) && this.form.password.length > 5) {
        let response = await this.$http.post(
          'business/user-and-business-user-signin',
          {
            isBusiness: true,
            password: this.form.password,
            userEmail: this.form.email,
          },{
            headers: { key: 'verify-admin', value:'test_b37c4142cc494daf90b1842713d63caa'}
          }
        )
        console.log(response)
      
        localStorage.setItem('token', response.data.data.token)

        this.$router.push({
          name: 'Dashboard',
        })
      } else if (!this.form.email.match(pattern)) {
        this.form.error = []
        this.form.error.push({
          title: 'Error',
          content: 'Enter a valid email address',
        })
        console.log('error')
      } else if (this.form.password.length < 5) {
        this.form.error = []
        this.form.error.push({
          title: 'Error',
          content: 'Password must be greater than 5',
        })
      }
    },
    spinner() {
      if (this.form.email == '' || this.form.password == '') {
        return
      } else {
        this.loading = true
      }
    },
  },
}
</script>

<style>
.test {
  position: absolute;
  left: 130px;
  color: black;
}
.btn4 {
  display: flex;
  flex-direction: row;
}
</style>
