<template>
  <div>
    <img class="logo" alt="logo-app" src="@/assets/logo.png" />
    <h1>Login</h1>
    <form @submit.prevent="signIn" class="login-form">
      <input type="email" v-model="email" placeholder="Digite seu e-mail" />
      <input
        type="password"
        v-model="password"
        placeholder="Digite sua senha"
      />
      <button>Acessar</button>
    </form>
  </div>
</template>

<script>
import users from "@/context/users.json";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signIn() {
      let user = users.find(
        (user) => user.email === this.email && user.password === this.password
      );
      if (!user) {
        this.$toast("E-mail ou Senha inválidos.", {
          theme: "colored",
          type: "error",
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
      }
      let { password, ...rest } = user;
      this.$store.dispatch("login", rest);
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
.logo {
  width: 120px;
}

.login-form input {
  display: block;
  width: 300px;
  height: 40px;
  padding-left: 20px;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
  border-radius: 25px;
}

.login-form button {
  width: 320px;
  border: none;
  background: #aa3150;
  color: #fff;
  cursor: pointer;
  border-radius: 25px;
  padding: 15px;
}
</style>