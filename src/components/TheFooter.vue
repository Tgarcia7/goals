<template>
  <footer class="footer mt-auto py-2 bg-dark fixed-bottom">
    <div class="container">
      <div class="row text-white">
        <router-link to="/goals/" class="text-decoration-none col">
          <font-awesome-icon icon="clipboard-list" size="lg"/>
          <br>
          <span>En proceso</span>
        </router-link>
        <router-link to="/goals/done" class="text-decoration-none col">
          <font-awesome-icon icon="clipboard-check" size="lg"/>
          <br>
          <span>Hecho</span>
        </router-link>
        <router-link to="/goals/statistics" class="text-decoration-none col">
          <font-awesome-icon icon="chart-bar" size="lg"/>
          <br>
          <span>Estadísticas</span>
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'TheFooter'
  }
</script>

<style scoped>
  /* Active state - Green glow for consistency */
  a.exact-active {
    color: var(--green-400) !important;
    text-shadow: var(--shadow-glow-green-sm);
  }

  a.exact-active svg {
    filter: drop-shadow(0 0 8px var(--green-300));
    color: var(--green-400);
  }

  a.exact-active span {
    font-weight: var(--font-semibold);
  }

  /* Default state */
  a {
    color: var(--gray-500) !important;
    transition: var(--transition-colors);
  }

  a:hover {
    color: var(--gray-400) !important;
  }

  a svg {
    transition: var(--transition-all);
    font-size: 1.3em;
  }

  a:hover svg {
    transform: translateY(-2px);
  }

  a span {
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    letter-spacing: 0.025em;
    display: block;
    margin-top: var(--space-1);
  }

  /* Footer container */
  footer {
    max-height: 80px;
    font-size: var(--text-sm);
    padding-bottom: env(safe-area-inset-bottom, 12px) !important;
    background-color: var(--bg-surface) !important;
    border-top: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  /* Add extra padding for mobile devices */
  @media (max-width: 991px) {
    footer {
      padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 20px) !important;
    }
  }

  .container {
    margin-top: 0.2em;
  }

  .footer a:active,
  .footer a:focus {
    outline: 0;
  }
</style>