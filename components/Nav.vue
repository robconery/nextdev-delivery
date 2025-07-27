<template>
  <div>
    <header class="navbar-light navbar-transparent navbar-sticky py-2">
      <!-- Logo Nav START -->
      <nav class="navbar navbar-expand-xl">
        <div class="container">
          <!-- Logo START -->
          <a class="navbar-brand" href="/">
            <img
              class="img-fluid"
              src="/images/logo_sf.png"
              alt="logo"
              style="max-width: 180px"
            />
          </a>
          <!-- Logo END -->

          <!-- Responsive navbar toggler -->
          <button
            class="navbar-toggler ms-auto text-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-animation">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <!-- Main navbar START -->
          <div class="navbar-collapse w-100 collapse" id="navbarCollapse">
            <!-- Nav Main menu START -->
            <ul class="navbar-nav navbar-nav-scroll mt-2">



            </ul>
            <!-- Nav Main menu END -->
            <div class="navbar-nav ms-2" style="display: none">
              <div class="modeswitch-wrap" id="darkModeSwitch">
                <div class="modeswitch-item">
                  <div class="modeswitch-icon"></div>
                </div>
              </div>
            </div>
            <!-- Nav Search START -->
            <!-- Nav Search END -->
          </div>

        </div>
      </nav>
      <!-- Logo Nav END -->
    </header>
    <div id="sticky-space" style="height: 0px" class=""></div>
  </div>
</template>
<script>
export default {

};
</script>
<style>
.nav-link {
  text-transform: uppercase;
  font-size: 0.8em !important;
  font-weight: bold;
}
</style>
