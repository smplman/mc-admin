<template>
  <div class="terminal" @click="onFocus">
    <pre class="console-output" ref="output"><output>{{consoleOutput}}</output></pre>
    <div class="prompt">
      <span>{{this.prompt}}</span>
      <input @keydown.enter="onSubmit" @keyup.up="onHistory" @keyup.down="onHistory" ref="prompt" class="prompt" type="text" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

export default Vue.component("Terminal", {
  data() {
    return {
      consoleOutput: "Some test output here.....\n",
      prompt: "> ",
      history: [],
      historyIdx: 0
    };
  },
  mounted() {
    this.onFocus();
  },
  methods: {
    onFocus: function() {
      this.$refs.prompt.focus({ preventScroll: true });
    },
    onSubmit: function(e) {
      console.log("onSubmit", e);
      const command = e.target.value;
      this.history.push(command)
      console.log(this.$refs.output);
      // this.$refs.output.scrollTop = this.$refs.output.clientHeight
      this.consoleOutput += `${this.prompt}${command}\n`
      axios
        .get(`http://localhost:3000/rcon`, {
          params: {
            command
          }
        })
        .then(response => {
          // JSON responses are automatically parsed.
          this.consoleOutput += `${response.data}\n`;
        })
        .catch(e => {
          this.errors.push(e);
        });
      
      this.$refs.prompt.value = ''
      this.historyIdx = 0
    },
    onHistory: function(e){
      console.log('onHistory', e)
      console.log(this.history)

      switch (e.key) {
        case 'ArrowUp':
          if (this.historyIdx < this.history.length) this.historyIdx++
          break
        case 'ArrowDown':
          if (this.historyIdx > 1) this.historyIdx--
          break
      }
      console.log('historyIdx', this.historyIdx)

      if (this.history.length && this.history[this.history.length - this.historyIdx] !== 'undefined') {
        this.$refs.prompt.value = this.history[this.history.length - this.historyIdx]
        // this.$refs.prompt.selectionStart = this.$refs.prompt.selectionEnd = this.$refs.prompt.value.length
      }

    }
  }
});
</script>

<style lang="scss">
.terminal {
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  height: 30vh;
  position: relative;

  .console-output {
    margin: 0;
    overflow-x: hidden;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */

    output {
      margin: 0;
      // white-space: pre-line;
      padding-bottom: 20px;
    }
  }

  .prompt {
    position: absolute;
    width: 100%;
    bottom: 0;
    color: #fff;

    -webkit-appearance: none;
    border: none;
    background: none;
    outline: none;

    span {
      background-color: #000;
      margin-right: 5px;
    }
  }
}
</style>