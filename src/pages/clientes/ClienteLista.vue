<template>
  <h1>Lista de Clientes</h1>
  <Content>
  <div class="page-header">
      <div class="search-and-buttons">
        <div class="input-container">
          <input type="text" placeholder="Pesquisar por Nome ou CPF..." />
        </div>
        <a class="btn-include" href="/clientes/adicionar">Incluir Cliente</a>
      </div>
    </div>
    <Table :fields="fieldsTable" :subfields="subfieldsTable" :rows="clientes" />
  </Content>
</template>

<script>
import Content from "@/components/Content.vue";
import Table from "@/components/Table.vue";
export default {
  components: { Content, Table },
  data() {
    return {
      clientes: [],
      fieldsTable: [
        { col: "#", field: "clienteId" },
        { col: "Nome", field: "nome" },
        { col: "CPF", field: "cpf" },
      ],
      subfieldsTable: [
        { col: "Data Nascimento", field: "dataNascimento" },
        { col: "Sexo", field: "sexo" },
        { col: "Estado Civil", field: "estadoCivil" },
        { col: "RG", field: "rg" },
        { col: "Data Expedição", field: "dataExpedicao" },
        { col: "Orgão Expedição", field: "orgaoExpedicao" },
        { col: "UF Expedição", field: "uf" },
        { col: "Logadouro", field: "endereco.logradouro" },
        { col: "Nº", field: "endereco.numero" },
        { col: "Bairro", field: "endereco.bairro" },
        { col: "Cidade", field: "endereco.cidade" },
        { col: "UF", field: "uf" },
      ],
    };
  },
  methods: {
    async getAllClientes() {
      this.$store.commit("setLoading", true);
      await this.$axios
        .get(`${import.meta.env.VITE_CLIENTES_V1}/listar`)
        .then((resp) => (this.clientes = resp.data))
        .catch((err) => {
          this.$store.commit("setLoading", false);
          this.$toast(`Erro: ${err.message}`, {
          theme: "colored",
          type: "error",
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
        })
        this.$store.commit("setLoading", false);
        ;
    },
  },
  mounted() {
    this.getAllClientes();
  },
};
</script>

<style>
.page-header {
  padding: 20px;
}

.input-container {
  flex: 1;
  width: 100%;
}

.search-and-buttons {
  display: flex;
  justify-content: space-between;
  gap: 200px;
}

.search-and-buttons input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding-left: 20px;
  flex: 1;
  width: 100%;
}

a.btn-include {
  text-decoration: none;
  padding: 10px 15px;
  background-color: #aa3150; /* Cor de fundo do botão */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

a.btn-include:hover {
  background-color: #8c2740; /* Cor de fundo do botão ao passar o mouse */
}

/* Responsividade */
@media (max-width: 768px) {
  .search-and-buttons {
    flex-direction: column;
    gap: 10px; /* Menos espaço em telas pequenas */
  }

  .search-input,
  .btn-include {
    width: 100%; /* Faz com que ambos ocupem a largura completa */
  }
}
</style>