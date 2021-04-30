<template>
  <div>
    <e-developing></e-developing>
  </div>
</template>

<script>
const Form = () => import('./components/Form')
const CreateFormPopup = $mixins.popupManager.$('create', Form)
const UpdateFormPopup = $mixins.popupManager.$('update', Form)

export default {
  mixins: [
    $mixins.pageList,
    $mixins.popupManager
  ],
  components: {
    CreateFormPopup,
    UpdateFormPopup
  },
  data () {
    return {
      query: this.getQuery({
        type: '1',
        title: '',
        key_word: '',
        ...this.$route.query
      }),
      pageData: {
        count: 0,
        data: []
      }
    }
  },
  methods: {
    fetch (query) {
      // let params = JSON.parse(JSON.stringify(query))
      // return this.$axios({
      //   url: '/v1/article',
      //   params
      // }).then(res => {
      //   this.pageData = res
      // })
    },
    handleUpdate (row) {
      this.pushOpen('update', row.article_id)
    },
    handleDelete (row, event) {
      this.$confirm('确认删除此文章', '提示', {
        type: 'warning'
      }).then(() => {
        return this.$axios({
          url: `/v1/article/${row.article_id}`,
          method: 'DELETE',
          options: {
            context: event.target
          }
        }).then(() => {
          this.fetch(this.query)
        })
      })
    }
  }
}
</script>

<style lang="scss">
</style>
