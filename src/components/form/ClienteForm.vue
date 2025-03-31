<template>
  <form @submit.prevent="submitForm" class="form-container">
    <label>Nome</label>
    <input v-model="nome" type="text" />
    <span class="error">{{ nomeError }}</span>

    <label>CPF</label>
    <input v-model="cpf" type="text" v-mask="'###.###.###-##'" />
    <span class="error">{{ cpfError }}</span>

    <label>RG</label>
    <input v-model="rg" type="text" v-mask="'##.###.###-#'" />
    <span class="error">{{ rgError }}</span>

    <label>Data de Expedição</label>
    <input v-model="dataExpedicao" type="date" :max="maxDate" />
    <span class="error">{{ dataExpedicaoError }}</span>

    <label>Órgão Expedidor</label>
    <input
      v-model="orgaoExpedicao"
      type="text"
      @input="orgaoExpedicao = $event.target.value.toUpperCase()"
    />
    <span class="error">{{ orgaoExpedicaoError }}</span>

    <label>UF Expedição</label>
    <input
      v-model="ufExpedicao"
      type="text"
      @input="ufExpedicao = $event.target.value.toUpperCase()"
      maxlength="2"
    />
    <span class="error">{{ ufExpedicaoError }}</span>

    <label>Data de Nascimento</label>
    <input v-model="dataNascimento" type="date" :max="maxDate" />
    <span class="error">{{ dataNascimentoError }}</span>

    <label>Sexo</label>
    <select v-model="sexo">
      <option value="">Selecione</option>
      <option value="masculino">Masculino</option>
      <option value="feminino">Feminino</option>
    </select>
    <span class="error">{{ sexoError }}</span>

    <label>Estado Civil</label>
    <select v-model="estadoCivil">
      <option value="">Selecione</option>
      <option value="solteiro">Solteiro</option>
      <option value="casado">Casado</option>
      <option value="divorciado">Divorciado</option>
    </select>
    <span class="error">{{ estadoCivilError }}</span>

    <label>CEP</label>
    <input v-model="cep" type="text" v-mask="'#####-###'" maxlength="9" />
    <span class="error">{{ cepError }}</span>

    <label>Logradouro</label>
    <input v-model="logradouro" type="text" />
    <span class="error">{{ logradouroError }}</span>

    <label>Número</label>
    <input v-model="numero" type="number" />
    <span class="error">{{ numeroError }}</span>

    <label>Complemento</label>
    <input v-model="complemento" type="text" />
    <span class="error"></span>

    <label>Bairro</label>
    <input v-model="bairro" type="text" />
    <span class="error">{{ bairroError }}</span>

    <label>Cidade</label>
    <input v-model="cidade" type="text" />
    <span class="error">{{ cidadeError }}</span>

    <label>UF</label>
    <input
      v-model="ufEndereco"
      type="text"
      maxlength="2"
      @input="ufEndereco = $event.target.value.toUpperCase()"
    />
    <span class="error">{{ ufEnderecoError }}</span>

    <button type="submit">Enviar</button>
  </form>
</template>

<script>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  props: {
    client: Object,
  },
  data() {
    return {
      maxDate: new Date().toISOString().split("T")[0],
    };
  },

  setup(props) {
    const notFutureDate = (value) => {
      if (!value) return true;
      const today = new Date();
      const inputDate = new Date(value);
      return inputDate <= today;
    };

    const validateCPF = (cpf) => {
      cpf = cpf.replace(/\D/g, "");
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

      let soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let resto = 11 - (soma % 11);
      let digitoVerificador1 = resto > 9 ? 0 : resto;

      if (parseInt(cpf.charAt(9)) !== digitoVerificador1) return false;

      soma = 0;
      for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
      }
      resto = 11 - (soma % 11);
      let digitoVerificador2 = resto > 9 ? 0 : resto;

      return parseInt(cpf.charAt(10)) === digitoVerificador2;
    };

    const schema = yup.object({
      cpf: yup
        .string()
        .required("(*) Campo obrigatório")
        .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido")
        .test("valid-cpf", "CPF inválido", (value) => {
          if (!value) return true;
          const cpf = value.replace(/\D/g, "");
          return validateCPF(cpf);
        }),
      nome: yup.string().required("(*) Campo obrigatório"),
      rg: yup.string().required("(*) Campo obrigatório"),
      dataExpedicao: yup
        .date()
        .transform((value, originalValue) => {
          return originalValue === "" ? null : value;
        })
        .required("(*) Campo obrigatório")
        .test(
          "not-future",
          "(*)  Não pode ser maior que a data atual",
          notFutureDate
        ),
      orgaoExpedicao: yup.string().required("(*) Campo obrigatório"),
      ufExpedicao: yup
        .string()
        .length(2, "(*) UF Expedição inválida")
        .required("(*) Campo obrigatório"),
      dataNascimento: yup
        .date()
        .transform((value, originalValue) => {
          return originalValue === "" ? null : value;
        })
        .required("(*) Campo obrigatório")
        .test(
          "not-future",
          "(*)  Não pode ser maior que a data atual",
          notFutureDate
        ),
      sexo: yup.string().required("(*) Campo obrigatório"),
      estadoCivil: yup.string().required("(*) Campo obrigatório"),
      cep: yup.string().required("(*) Campo obrigatório"),
      logradouro: yup.string().required("(*) Campo obrigatório"),
      numero: yup.string().required("(*) Campo obrigatório"),
      complemento: yup.string(),
      bairro: yup.string().required("(*) Campo obrigatório"),
      cidade: yup.string().required("(*) Campo obrigatório"),
      ufEndereco: yup
        .string()
        .length(2, "UF inválida")
        .required("(*) Campo obrigatório"),
    });

    const { handleSubmit, resetForm } = useForm({
      validationSchema: schema,
      initialValues: {
        cpf: "",
        nome: "",
        rg: "",
        dataExpedicao: "",
        orgaoExpedicao: "",
        ufExpedicao: "",
        dataNascimento: "",
        sexo: "",
        estadoCivil: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        ufEndereco: "",
      },
    });

    const { value: cpf, errorMessage: cpfError } = useField("cpf");
    const { value: nome, errorMessage: nomeError } = useField("nome");
    const { value: rg, errorMessage: rgError } = useField("rg");
    const { value: dataExpedicao, errorMessage: dataExpedicaoError } =
      useField("dataExpedicao");
    const { value: orgaoExpedicao, errorMessage: orgaoExpedicaoError } =
      useField("orgaoExpedicao");
    const { value: ufExpedicao, errorMessage: ufExpedicaoError } =
      useField("ufExpedicao");
    const { value: dataNascimento, errorMessage: dataNascimentoError } =
      useField("dataNascimento");
    const { value: sexo, errorMessage: sexoError } = useField("sexo");
    const { value: estadoCivil, errorMessage: estadoCivilError } =
      useField("estadoCivil");
    const { value: cep, errorMessage: cepError } = useField("cep");
    const { value: logradouro, errorMessage: logradouroError } =
      useField("logradouro");
    const { value: numero, errorMessage: numeroError } = useField("numero");
    const { value: complemento } = useField("complemento");
    const { value: bairro, errorMessage: bairroError } = useField("bairro");
    const { value: cidade, errorMessage: cidadeError } = useField("cidade");
    const { value: ufEndereco, errorMessage: ufEnderecoError } =
      useField("ufEndereco");

    return {
      cpf,
      cpfError,
      nome,
      nomeError,
      rg,
      rgError,
      dataExpedicao,
      dataExpedicaoError,
      orgaoExpedicao,
      orgaoExpedicaoError,
      ufExpedicao,
      ufExpedicaoError,
      dataNascimento,
      dataNascimentoError,
      sexo,
      sexoError,
      estadoCivil,
      estadoCivilError,
      cep,
      cepError,
      logradouro,
      logradouroError,
      numero,
      numeroError,
      complemento,
      bairro,
      bairroError,
      cidade,
      cidadeError,
      ufEndereco,
      ufEnderecoError,
      handleSubmit,
      resetForm,
    };
  },

  methods: {
    submitForm() {
      this.handleSubmit(async (values) => {
        const {
          cep,
          logradouro,
          numero,
          complemento,
          bairro,
          cidade,
          ufEndereco,
          ...rest
        } = values;

        const formData = {
          ...rest,
          ...{ clienteId: this.client.clienteId ?? null },
          cpf: values.cpf.replace(/\D/g, ""),
          rg: values.rg.replace(/\D/g, ""),
          endereco: {
            ...{ enderecoId: this.client.endereco.enderecoId ?? null },
            cep: cep.replace(/\D/g, ""),
            logradouro,
            numero: numero.toString(),
            complemento,
            bairro,
            cidade,
            uf: ufEndereco,
          },
        };

        const baseUrl = this.client.clienteId
          ? `${import.meta.env.VITE_CLIENTES_V1}/alterar`
          : `${import.meta.env.VITE_CLIENTES_V1}/adicionar`;

        const method = this.client.clienteId ? "put" : "post";
        this.$store.commit("setLoading", true);
        this.$axios[method](baseUrl, formData)
          .then(() => {
            this.$store.commit("setLoading", false);
            this.$toast("Cliente salvo com sucesso!", {
              theme: "colored",
              type: "success",
              hideProgressBar: true,
              autoClose: 1000,
              pauseOnHover: false,
              pauseOnFocusLoss: false,
            });
            if(formData.clienteId){
              this.$emit("updateClientDetails");
            }
          })
          .catch((err) => {
            this.$store.commit("setLoading", false);
            this.$toast(`Erro: ${err.message}`, {
              theme: "colored",
              type: "error",
              pauseOnHover: false,
              pauseOnFocusLoss: false,
            });
          });

        this.$store.commit("setLoading", false);
        this.resetForm();
      })();
    },

    async buscaCep(cep) {
      await this.$store.commit("setLoading", true);
      this.$axios
        .get(`https://viacep.com.br/ws/${cep}/json`)
        .then((resp) => {
          const data = resp.data;
          if (!data.erro) {
            this.logradouro = data.logradouro;
            this.bairro = data.bairro;
            this.cidade = data.localidade;
            this.ufEndereco = data.uf;
          }
          this.$store.commit("setLoading", false);
        })
        .catch((erro) => {
          this.$store.commit("setLoading", false);
          this.$toast(`Erro ao buscar CEP: ${erro.message}`, {
            theme: "colored",
            type: "error",
            pauseOnHover: false,
            pauseOnFocusLoss: false,
          });
        });
    },
  },
  watch: {
    cep(newCep) {
      const cepNumerico = newCep.replace(/\D/g, "");
      if (cepNumerico.length === 8) {
        this.buscaCep(cepNumerico);
      }
    },
    client: {
      handler(newClient) {
        if (newClient) {
          this.resetForm({
            values: {
              cpf: newClient.cpf || "",
              nome: newClient.nome || "",
              rg: newClient.rg || "",
              dataExpedicao: newClient.dataExpedicao
                ? this.$moment(newClient.dataExpedicao).format("YYYY-MM-DD")
                : "",
              orgaoExpedicao: newClient.orgaoExpedicao || "",
              ufExpedicao: newClient.uf || "",
              dataNascimento: newClient.dataNascimento
                ? this.$moment(newClient.dataNascimento).format("YYYY-MM-DD")
                : "",
              sexo: newClient.sexo || "",
              estadoCivil: newClient.estadoCivil || "",
              cep: newClient.endereco?.cep || "",
              logradouro: newClient.logradouro || "",
              numero: newClient.endereco?.numero || "",
              complemento: newClient.endereco?.complemento || "",
              bairro: newClient.bairro || "",
              cidade: newClient.cidade || "",
              ufEndereco: newClient.ufEndereco || "",
            },
          });
        }
      },
      immediate: true, // Para carregar os dados no início
      deep: true, // Para detectar mudanças em objetos aninhados
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
}

label {
  text-align: left;
  padding-bottom: 10px;
}

input,
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: #e53935;
  font-size: 12px;
  min-height: 16px;
  margin-top: 6px;
}

@media (max-width: 600px) {
  .form-container {
    padding: 15px;
  }

  input,
  select {
    padding: 8px;
    font-size: 14px;
  }
}
</style>