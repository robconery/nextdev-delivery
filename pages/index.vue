<template>
<section class="">
	<div class="container">
		<div class="row mt-2 justify-content-center mb-8 pt-6">
      <div class="col-lg-7" >
        <h1>Hi there. Welcome to my delivery site.</h1>
        <p>I created this to work hand in hand with Stripe Checkout. The idea is that you add file information in the meta data of your Stripe Product, and then use Firebase to store the file.
      </p>
      <p> This app was built using Nuxt 3, but the only data stored is at Stripe (I don't use Firestore for anything other than hosting and functions).
        </p>
      <p> Want to see how it works? <a href="https://robconery.com">go buy something!</a>
        </p>
      </div>

    </div>
  </div>
</section>
</template>

<script lang="ts" setup>

</script>

<style>

</style>