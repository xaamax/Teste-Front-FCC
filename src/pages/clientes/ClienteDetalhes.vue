<template>
  <h1>Cadastro de Cliente</h1>
  <Content>
    <ClienteForm
      :client="clientDetails"
      @updateClientDetails="getClientDetails($route.params.id)"
    />
  </Content>
</template>

<script>
import Content from "@/components/Content.vue";
import ClienteForm from "@/components/form/ClienteForm.vue";
export default {
  name: "ClienteDetalhes",
  components: { Content, ClienteForm },
  data() {
    return {
      clientDetails: {},
    };
  },
  methods: {
    async getClientDetails(id) {
      this.$store.commit("setLoading", true);
      await this.$axios
        .get(`${import.meta.env.VITE_CLIENTES_V1}/listarporid/${id}`)
        .then((resp) => {
          this.clientDetails = resp.data;
          this.$store.commit("setLoading", false);
        })
        .catch((erro) => {
          this.$toast(`Erro: ${erro.message}`, {
            theme: "colored",
            type: "error",
            pauseOnHover: false,
            pauseOnFocusLoss: false,
          });
        });
    },
  },
  mounted() {
    const { id } = this.$route.params || "";
    if (id) {
      this.getClientDetails(id);
    }
  },
};
</script>

<style>
</style>
