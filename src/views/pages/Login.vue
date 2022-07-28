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
                      <CButton color="primary" class="px-4" @click="login">
                        Login
                      </CButton>
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
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
        error: [],
        showtoast: false,
      },
    }
  },

  methods: {
    async login() {
      const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

      if (this.form.email.match(pattern) && this.form.password.length > 5) {
        //  return this.$router.push('/dashboard')

        let response = await this.$http.post(
          'business/user-and-business-user-signin',
          {
            isBusiness: true,
            password: this.form.password,
            userEmail: this.form.email,
          },
        )
        console.log(response)

        localStorage.setItem('token', response.data.data.token)
        

        this.$router.push({
          name: 'Dashboard'
          
        })
      } else if(!this.form.email.match(pattern)){
         this.form.error = []
        this.form.error.push({
          title: 'Error',
          content: 'Enter a valid email address',
        })
        console.log('error')
      }else if(this.form.password.length < 5){
         this.form.error = []
        this.form.error.push({
          title: 'Error',
          content: 'Password must be greater than 5',
        })
      }
 
      // this.form.error = []

      // if (!this.form.email.match(pattern)) {
      //   this.form.error.push({
      //     title: 'Error',
      //     content: 'Enter a valid email address',
      //   })
      //   console.log('error')
      // }
      // if (this.form.password.length < 5) {
      //   this.form.error.push({
      //     title: 'Error',
      //     content: 'Password must be greater than 5',
      //   })
      // }
    },
  },
}
</script>
