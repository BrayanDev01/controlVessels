<script>
import MapView from '../components/map/MapComponent.vue';
import axios from 'axios';

export default {
  components: {
    MapView
  },
  data() {
    return {
      latitude: "38.376129",
      longitude: "-75.055186",
      infos: null,
      loading: true
    };
  },
  methods: {
    async getAnomalie(id) {
      const options = {
        method: 'GET',
        url: `${import.meta.env.VITE_URL_API}classes/Anomalies/${id}`,
        params: { include: 'reportFor' },
        headers: {
          'X-Parse-Rest-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
          'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
        }
      }

      await axios.request(options).then((response) => {
        this.infos = response.data
        this.loading = false

        document.title = "Relatório de Anomalia - " + this.infos.numericId
      }).catch((error) => {
        console.log(error)
      })
    },

    // ---------- formatting helpers ----------
    val(x) {
      return (x === null || x === undefined || x === '') ? '—' : x
    },
    formatDate(x) {
      if (!x) return '—'
      return new Date(x).toLocaleDateString('pt-BR')
    },
    formatDateTime(x) {
      if (!x) return '—'
      return new Date(x).toLocaleString('pt-BR')
    },
    formatCurrency(x) {
      if (x === null || x === undefined || x === '') return '—'
      const n = Number(x)
      if (Number.isNaN(n)) return '—'
      return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    },
    toBool(x) {
      if (typeof x === 'boolean') return x
      if (typeof x === 'string') return x.toLowerCase() === 'true'
      return !!x
    },
    boolLabel(x) {
      return this.toBool(x) ? 'Sim' : 'Não'
    },

    // ---------- status / criticality visuals ----------
    statusMeta(status) {
      const map = {
        'Aberto': { label: 'Aberto', tone: 'warning' },
        'Em Andamento': { label: 'Em Andamento', tone: 'info' },
        'Fechado': { label: 'Fechado', tone: 'success' },
        'Cancelado': { label: 'Cancelado', tone: 'neutral' }
      }
      return map[status] || { label: status || '—', tone: 'neutral' }
    },
    criticalityMeta(crit) {
      const map = {
        'Prioridade Alta': { label: 'Alta', tone: 'danger' },
        'Prioridade Média': { label: 'Média', tone: 'warning' },
        'Prioridade Baixa': { label: 'Baixa', tone: 'success' }
      }
      return map[crit] || { label: crit || '—', tone: 'neutral' }
    },

    printRelatorio() {
      window.print()
    }
  },
  computed: {
    fiveWhysList() {
      if (!this.infos?.fiveWhys?.length) return []
      const set = this.infos.fiveWhys[0]
      const order = ['firstWhy', 'secondWhy', 'thirdWhy', 'fourthWhy', 'fifthWhy']
      return order
        .map((key, i) => ({ n: i + 1, text: set[key] }))
        .filter(item => item.text)
    }
  },
  created() {
    this.getAnomalie(this.$route.params.id);
  }
};
</script>

<template>
  <div class="report-page backgroundPrint">
    <div v-if="infos" class="form-container">

      <!-- ===================== HEADER ===================== -->
      <header class="report-header">
        <div class="report-header__brand">
          <!-- TODO: substituir por <img :src="logoUrl" alt="3NF" class="report-header__logo" /> quando o arquivo do logo for enviado -->
          <div class="report-header__logo-placeholder">3NF</div>
        </div>

        <div class="report-header__title">
          <span class="report-header__eyebrow">Relatório de Anomalia / Não Conformidade</span>
          <h1>Nº {{ infos?.numericId }}</h1>
        </div>

        <div class="report-header__badges">
          <span class="badge" :class="`badge--${statusMeta(infos?.status).tone}`">
            {{ statusMeta(infos?.status).label }}
          </span>
          <span class="badge" :class="`badge--${criticalityMeta(infos?.criticalityAnomalie).tone}`">
            Criticidade {{ criticalityMeta(infos?.criticalityAnomalie).label }}
          </span>
          <span v-if="infos?.classification?.name" class="badge badge--outline">
            {{ infos.classification.name }}
          </span>
          <span v-if="infos?.purgatory?.name" class="badge badge--outline">
            {{ infos.purgatory.name }}
          </span>
        </div>
      </header>

      <!-- ===================== INFORMAÇÕES GERAIS ===================== -->
      <section class="section">
        <h2 class="section__title">Informações Gerais</h2>
        <div class="data-grid data-grid--4">
          <div class="data-item">
            <span class="data-item__label">Base</span>
            <span class="data-item__value">{{ val(infos?.base) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Local</span>
            <span class="data-item__value">{{ val(infos?.place) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Departamento responsável</span>
            <span class="data-item__value">{{ val(infos?.departmentResp) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">E-mail do responsável</span>
            <span class="data-item__value">{{ val(infos?.emailResp) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Tipo de anomalia</span>
            <span class="data-item__value">{{ val(infos?.typeAnomalie) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Equipamento</span>
            <span class="data-item__value">{{ val(infos?.equipament) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Nome do equipamento</span>
            <span class="data-item__value">{{ val(infos?.nameEquipament) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Impacto</span>
            <span class="data-item__value">{{ val(infos?.impact) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Criado por</span>
            <span class="data-item__value">{{ val(infos?.reportFor?.fullName) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Data de criação</span>
            <span class="data-item__value">{{ formatDate(infos?.createdAt) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Última atualização</span>
            <span class="data-item__value">{{ formatDateTime(infos?.updatedAt) }}</span>
          </div>
        </div>
      </section>

      <!-- ===================== RESUMO DA ANOMALIA ===================== -->
      <section class="section">
        <h2 class="section__title">Resumo da Anomalia</h2>
        <div class="text-block">
          <span class="text-block__label">Resumo</span>
          <p>{{ val(infos?.resumeAnomalie) }}</p>
        </div>
        <div class="data-grid data-grid--2">
          <div class="data-item">
            <span class="data-item__label">Motivo</span>
            <span class="data-item__value">{{ val(infos?.reasonAnomalie) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Envolvidos</span>
            <span class="data-item__value">{{ val(infos?.envolvedInAnomalie) }}</span>
          </div>
        </div>
      </section>

      <!-- ===================== EVIDÊNCIAS ===================== -->
      <section v-if="infos?.evidencesAnalises?.length" class="section">
        <h2 class="section__title">Evidências</h2>
        <div class="media-grid">
          <figure v-for="(image, index) in infos.evidencesAnalises" :key="index" class="media-item">
            <Image :src="image.location" alt="evidência" width="180" preview />
            <figcaption>{{ image.originalname }}</figcaption>
          </figure>
        </div>
      </section>

      <!-- ===================== 5 PORQUÊS ===================== -->
      <section v-if="fiveWhysList.length" class="section">
        <h2 class="section__title">Análise de Causa Raiz — 5 Porquês</h2>
        <ol class="why-list">
          <li v-for="item in fiveWhysList" :key="item.n" class="why-item">
            <span class="why-item__number">{{ item.n }}</span>
            <p class="why-item__text">{{ item.text }}</p>
          </li>
        </ol>
      </section>

      <!-- ===================== AÇÃO IMEDIATA ===================== -->
      <section v-if="infos?.actionImmediate?.length" class="section">
        <h2 class="section__title">Ação Imediata</h2>
        <table class="report-table">
          <thead>
            <tr>
              <th>Ação</th>
              <th>Responsável</th>
              <th>Prazo</th>
              <th>Implantado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(action, index) in infos.actionImmediate" :key="index">
              <td>{{ val(action.actionImmediateText) }}</td>
              <td>{{ val(action.respEmailAction) }}</td>
              <td>{{ formatDate(action.dateLimit) }}</td>
              <td>
                <span class="badge" :class="action.implant ? 'badge--success' : 'badge--neutral'">
                  {{ action.implant ? 'Sim' : 'Não' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- ===================== PLANO DE AÇÃO CORRETIVA (5W2H) ===================== -->
      <section v-if="infos?.actionCorrectives?.length" class="section">
        <h2 class="section__title">Plano de Ação Corretiva (5W2H)</h2>
        <div v-for="(action, index) in infos.actionCorrectives" :key="index" class="corrective-card">
          <div class="data-grid data-grid--2">
            <div class="data-item">
              <span class="data-item__label">O quê</span>
              <span class="data-item__value">{{ val(action.what) }}</span>
            </div>
            <div class="data-item">
              <span class="data-item__label">Por quê</span>
              <span class="data-item__value">{{ val(action.why) }}</span>
            </div>
            <div class="data-item">
              <span class="data-item__label">Onde</span>
              <span class="data-item__value">{{ val(action.where) }}</span>
            </div>
            <div class="data-item">
              <span class="data-item__label">Quando</span>
              <span class="data-item__value">{{ formatDate(action.when) }}</span>
            </div>
            <div class="data-item">
              <span class="data-item__label">Quem</span>
              <span class="data-item__value">{{ val(action.who) }}</span>
            </div>
            <div class="data-item">
              <span class="data-item__label">Como</span>
              <span class="data-item__value">{{ val(action.how) }}</span>
            </div>
            <div class="data-item">
              <span class="data-item__label">Quanto</span>
              <span class="data-item__value">{{ formatCurrency(action.howMuch) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================== RETRATAÇÃO DO SETOR ===================== -->
      <section class="section">
        <h2 class="section__title">Retratação do Setor</h2>
        <div class="data-grid data-grid--2">
          <div class="text-block">
            <span class="text-block__label">Argumento do gestor</span>
            <p>{{ val(infos?.gestorArgument) }}</p>
          </div>
          <div class="text-block">
            <span class="text-block__label">Causa após análise</span>
            <p>{{ val(infos?.causeAfterAnalise) }}</p>
          </div>
          <div class="text-block">
            <span class="text-block__label">Ação de contenção</span>
            <p>{{ val(infos?.actionOfContention) }}</p>
          </div>
          <div class="text-block">
            <span class="text-block__label">Contramedida</span>
            <p>{{ val(infos?.contramedida) }}</p>
          </div>
        </div>
      </section>

      <!-- ===================== ANÁLISE DA QUALIDADE ===================== -->
      <section class="section">
        <h2 class="section__title">Análise da Qualidade</h2>
        <div class="text-block">
          <span class="text-block__label">Análise</span>
          <p>{{ val(infos?.resumeQuality) }}</p>
        </div>
        <div v-if="infos?.archives?.length" class="media-grid">
          <figure v-for="(image, index) in infos.archives" :key="index" class="media-item">
            <Image :src="image.location" alt="anexo" width="180" preview />
            <figcaption>{{ image.originalname }}</figcaption>
          </figure>
        </div>
      </section>

      <!-- ===================== VERIFICAÇÃO DE EFICÁCIA ===================== -->
      <section class="section">
        <h2 class="section__title">Verificação de Eficácia</h2>
        <div class="data-grid data-grid--3">
          <div class="data-item">
            <span class="data-item__label">Necessita revisão</span>
            <span class="data-item__value">{{ boolLabel(infos?.needRevision) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Responsável pela verificação</span>
            <span class="data-item__value">{{ val(infos?.respToCheck) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Ação eficaz</span>
            <span class="badge" :class="toBool(infos?.isEffective) ? 'badge--success' : 'badge--danger'">
              {{ toBool(infos?.isEffective) ? 'Sim' : 'Não' }}
            </span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Data de verificação</span>
            <span class="data-item__value">{{ formatDate(infos?.timeToCheck) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Data de encerramento</span>
            <span class="data-item__value">{{ formatDate(infos?.dateToFinish) }}</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">Data de revisão</span>
            <span class="data-item__value">{{ formatDate(infos?.revisionDate) }}</span>
          </div>
        </div>
        <div class="text-block">
          <span class="text-block__label">Motivo da revisão</span>
          <p>{{ val(infos?.reasonRevision) }}</p>
        </div>
        <div class="text-block">
          <span class="text-block__label">Observações</span>
          <p>{{ val(infos?.observations) }}</p>
        </div>
      </section>

      <!-- ===================== HISTÓRICO DE ALTERAÇÕES ===================== -->
      <section v-if="infos?.logs?.length" class="section section--muted">
        <h2 class="section__title">Histórico de Alterações</h2>
        <table class="report-table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>Ação</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in infos.logs" :key="log.objectId">
              <td>{{ val(log.user) }}</td>
              <td>{{ val(log.email) }}</td>
              <td>{{ val(log.action) }}</td>
              <td>{{ formatDateTime(log.date) }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer class="report-footer">
        Documento gerado em {{ formatDateTime(new Date()) }}
      </footer>
    </div>

    <Button class="printBtn" @click="printRelatorio()" icon="pi pi-print" label="Imprimir" />
  </div>
</template>

<style scoped>
:root {
  --primary-color-gc: #222C56;
  --secondary-color-gc: #FF7400;
}

.report-page {
  --primary: #222C56;
  --primary-tint: #EEF0F6;
  --secondary: #FF7400;
  --secondary-tint: #FFF1E6;
  --success: #1E824C;
  --success-tint: #E7F5EC;
  --warning: #B4690E;
  --warning-tint: #FFF1E0;
  --danger: #B3261E;
  --danger-tint: #FBEAE9;
  --ink: #1B1F2A;
  --muted: #6B7280;
  --border: #E1E4EB;
  --surface: #FFFFFF;
  --bg: #EEF0F3;

  width: 100%;
  min-height: 100vh;
  background-color: var(--bg);
  padding: 32px 0;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--ink);
}

.form-container {
  width: 21cm;
  min-height: 29.7cm;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  padding-bottom: 24px;
}

/* ---------- header ---------- */
.report-header {
  display: flex;
  align-items: center;
  gap: 24px;
  background-color: var(--primary);
  color: #fff;
  padding: 24px 32px;
}

.report-header__logo-placeholder {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.report-header__title {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.report-header__eyebrow {
  font-size: 13px;
  opacity: 0.75;
}

.report-header__title h1 {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
}

.report-header__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
  max-width: 260px;
}

/* ---------- badges ---------- */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.badge--success { background: var(--success-tint); color: var(--success); }
.badge--warning { background: var(--warning-tint); color: var(--warning); }
.badge--danger  { background: var(--danger-tint);  color: var(--danger); }
.badge--info    { background: var(--secondary-tint); color: var(--secondary); }
.badge--neutral { background: #EEF0F3; color: var(--muted); }
.badge--outline {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

/* ---------- sections ---------- */
.section {
  padding: 20px 32px;
  border-bottom: 1px solid var(--border);
  break-inside: avoid;
}

.section--muted {
  background-color: #FAFAFC;
}

.section__title {
  margin: 0 0 16px 0;
  padding-left: 12px;
  border-left: 3px solid var(--secondary);
  font-size: 16px;
  font-weight: 700;
  color: var(--primary);
}

/* ---------- data grid ---------- */
.data-grid {
  display: grid;
  gap: 16px 24px;
  margin-bottom: 12px;
}

.data-grid--2 { grid-template-columns: repeat(2, 1fr); }
.data-grid--3 { grid-template-columns: repeat(3, 1fr); }
.data-grid--4 { grid-template-columns: repeat(4, 1fr); }

.data-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.data-item__label {
  font-size: 12px;
  color: var(--muted);
}

.data-item__value {
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
}

/* ---------- text blocks ---------- */
.text-block {
  margin-bottom: 12px;
}

.text-block__label {
  display: block;
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 4px;
}

.text-block p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-line;
}

/* ---------- media grid ---------- */
.media-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.media-item {
  margin: 0;
  text-align: center;
}

.media-item figcaption {
  margin-top: 6px;
  font-size: 11px;
  color: var(--muted);
  max-width: 180px;
}

/* ---------- 5 whys ---------- */
.why-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.why-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.why-item__number {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--primary-tint);
  color: var(--primary);
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.why-item__text {
  margin: 0;
  padding-top: 3px;
  font-size: 14px;
  line-height: 1.6;
}

/* ---------- tables ---------- */
.report-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.report-table th {
  text-align: left;
  padding: 8px 10px;
  background: var(--primary-tint);
  color: var(--primary);
  font-weight: 600;
  border-bottom: 1px solid var(--border);
}

.report-table td {
  padding: 8px 10px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}

.report-table tr:last-child td {
  border-bottom: none;
}

/* ---------- corrective action card ---------- */
.corrective-card {
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-left: 3px solid var(--primary);
  border-radius: 4px;
  margin-bottom: 12px;
}

.corrective-card:last-child {
  margin-bottom: 0;
}

/* ---------- footer ---------- */
.report-footer {
  padding: 12px 32px 0;
  font-size: 11px;
  color: var(--muted);
  text-align: right;
}

/* ---------- print button ---------- */
.printBtn {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--secondary-color-gc);
  border-color: var(--secondary-color-gc);
}

@media print {
  .report-page {
    background-color: #fff;
    padding: 0;
  }
  .form-container {
    width: 100%;
    min-height: 0;
    border: none;
    border-radius: 0;
  }
  .printBtn {
    display: none;
  }
  .section {
    break-inside: avoid;
  }
  .badge, .report-header {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}

@media (max-width: 900px) {
  .form-container {
    width: 100%;
  }
  .data-grid--3, .data-grid--4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .report-header {
    flex-wrap: wrap;
  }
  .report-header__badges {
    justify-content: flex-start;
    max-width: none;
  }
  .data-grid--2, .data-grid--3, .data-grid--4 {
    grid-template-columns: 1fr;
  }
}
</style>