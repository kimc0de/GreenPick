const app = Vue.createApp({});

app.component('component-header', {
  data() {
    return {
      loggedOut: true
    };
  },
  template: `<header>
  <nav class="navbar navbar-expand-xl navbar-dark">
    <!--  Logo  -->
    <a id="brand-logo" href="/">
      <img src="/images/greenpick/logo1.svg" alt="green pick logo">
    </a>

    <!--  Button to toggle menu on mobile screen -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <template v-if="loggedOut">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">Search</a>
        </li>
        <li class="nav-item">
          <a class="nav-link btn btn-outline-primary my-1 my-lg-0" href="/login">Log In</a>
        </li>
        <li class="nav-item">
          <a class="nav-link btn btn-primary my-1 my-lg-0" href="/signup">Sign Up</a>
        </li>
      </ul>
      </template>
      <template v-else="loggedOut">
      <ul class="navbar-nav ml-auto align-items-center">
        <li class="nav-item nav-line">
          <a class="nav-link" href="/">Search</a>
        </li>
        <li class="nav-item nav-line">
          <a class="nav-link" href="/user/add">Add alternative</a>
        </li>
        <li class="nav-item nav-line">
          <a class="nav-link" href="/user">
            <span id="user-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                <path
                  d="M17.3152 15.3542C14.6056 14.6805 12.0835 14.0899 13.3048 11.6056C17.0237 4.04388 14.2905 0 10.3643 0C6.3602 0 3.6955 4.19915 7.42387 11.6056C8.68216 14.1044 6.06473 14.6949 3.41343 15.3542C0.992201 15.9566 0.901592 17.2514 0.909471 19.5152L0.912623 20.3636H19.8145L19.8176 19.5415C19.8271 17.2607 19.7451 15.9592 17.3152 15.3542Z"
                  fill="#639C70" />-->
              </svg>
            </span>
            <span id="profile-text">
              Profile
            </span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/logout">Log out</a>
        </li>
      </ul>
      </template>
    </div>
  </nav>
</header>`
});

app.mount('#app');