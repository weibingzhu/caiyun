<template>
  <div>
    <e-developing></e-developing>
  </div>
</template>

<script>

export default {
  mixins: [
    $mixins.pageList
  ],
  data () {
    return {
      query: this.getQuery({
        qualification: '全部',
        type: '1',
        name: '',
        key_word: '',
        ...this.$route.query
      }),
      expands: [],
      expandsTestIndex: -1,
      pageData: {
        count: 0,
        data: []
      }
    }
  },
  created () {
    document.addEventListener('keydown', this.handleEvent)
  },
  methods: {
    fetch (query) {
      let params = JSON.parse(JSON.stringify(query))
      return this.$axios({
        url: '/v1/article',
        params
      }).then(res => {
        this.pageData = res
      })
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    testCreate () {
      this.expands = []
      this.expands = [this.conmpanise[this.expandsTestIndex++].idp]
    },

    getRowKeys: (row) => {
      return row.idp
    },
    exChangeHeandler (row, rowList) {
      let that = this
      if (rowList.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.idp)
        }
      } else {
        that.expands = []
      }
    },
    handleEvent (event) {
      if (event.keyCode === 37 || event.keyCode === 38) { // && event.ctrlKey
        // event.preventDefault()
        // event.returnValue = false
        this.expands = []
        this.expandsTestIndex = --this.expandsTestIndex < 0 ? 0 : this.expandsTestIndex
        this.expands = [this.conmpanise[this.expandsTestIndex].idp]
      } else if (event.keyCode === 39 || event.keyCode === 40) {
        this.expands = []
        this.expandsTestIndex = ++this.expandsTestIndex > this.conmpanise.length - 1 ? this.conmpanise.length - 1 : this.expandsTestIndex
        this.expands = [this.conmpanise[this.expandsTestIndex].idp]
      } else if (event.keyCode === 27) {
        this.expands = []
        this.expandsTestIndex = -1
      }
    }

  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.handleEvent)
  }
}
</script>

<style lang="scss">
</style>
