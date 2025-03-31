<template>
  <div class="table">
    <div class="row header">
      <div v-for="(field, index) in fields" :key="index" class="cell">
        {{ field.col }}
      </div>
      <div class="cell">Ações</div>
    </div>
    <div v-if="!rows.length" style="padding: 18px">
      <span>Nenhum registro encontrado.</span>
    </div>
    <template v-for="(row, rowIndex) in rows" :key="rowIndex">
      <div class="row">
        <div
          v-for="(col, colIndex) in fields"
          :key="colIndex"
          class="cell"
          :data-title="col.col"
        >
          {{ row[col.field] }}
        </div>
        <div class="cell">
          <button class="btn-details" @click="toggleDetails(rowIndex)">
            {{ expandedRow === rowIndex ? "- Detalhes" : "+ Detalhes" }}
          </button>
        </div>
      </div>
      <div v-if="expandedRow === rowIndex" class="row details-row">
        <div class="cell details-cell" :colspan="fields.length + 1">
          <div class="details-content">
            <div
              v-for="(subfield, key) in subfields"
              :key="key"
              class="detail-item"
            >
              <strong>{{ subfield.col }}:</strong> {{ getFieldValue(row, subfield.field) }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>


<script>
export default {
  name: "Table",
  props: {
    fields: Array,
    rows: Array,
    subfields: Array,
  },
  data() {
    return {
      expandedRow: null,
    };
  },
  methods: {
    toggleDetails(index) {
      this.expandedRow = this.expandedRow === index ? null : index;
    },
    getFieldValue(obj, path) {
      const value = path.split(".").reduce((o, p) => (o || {})[p], obj);
      // if (path.includes("data") && value) {
      //   return this.formatDate(value); 
      // }
      return value || "***";
    },
  },
};
</script>

<style>
.table {
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.row {
  display: flex;
  width: 100%;
}

.row:nth-of-type(odd) {
  background: #e9e9e9;
}

.row.header {
  font-weight: 900;
  color: #ffffff;
  background: #aa3150;
}

.cell {
  flex: 1;
  padding: 10px;
  text-align: inherit;
}

.details-cell {
  display: flex;
  flex-direction: column;
}

.details-content {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.detail-item {
  min-width: calc(33% - 16px);
}

.btn-details {  
  color: steelblue; 
  background: transparent;
  cursor: pointer;
  border: none;
  padding: 6px;
}


@media screen and (max-width: 580px) {
  body {
    font-size: 16px;
    line-height: 22px;
  }
}

@media screen and (max-width: 580px) {
  .table {
    display: block;
  }
}

@media screen and (max-width: 580px) {
  .row {
    padding: 14px 0 7px;
    display: block;
  }

  .row.header {
    padding: 0;
    height: 6px;
  }

  .row.header .cell {
    display: none;
  }

  .row .cell {
    margin-bottom: 10px;
  }

  .row .cell:before {
    margin-bottom: 3px;
    content: attr(data-title);
    min-width: 98px;
    font-size: 10px;
    line-height: 10px;
    font-weight: bold;
    text-transform: uppercase;
    color: #969696;
    display: block;
  }
}

@media screen and (max-width: 580px) {
  .cell {
    padding: 2px 16px;
    display: block;
  }
}
</style>