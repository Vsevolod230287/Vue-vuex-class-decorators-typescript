<template>
  <div id="qr-code-full-region"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode'
import { QrcodeErrorCallback, QrcodeSuccessCallback, QrDimensions } from 'html5-qrcode/esm/core'
import { Html5QrcodeCameraScanConfig } from 'html5-qrcode/esm/html5-qrcode'

@Component
export default class QrcodeScanner extends Vue {
  @Prop({ default: 200 }) private qrbox!: number | QrDimensions
  @Prop({ default: 10 }) private fps!: number
  @Prop() private onScanSucess!: QrcodeSuccessCallback
  @Prop() private onScanError!: QrcodeErrorCallback | undefined

  html5QrcodeScanner!: Html5QrcodeScanner

  mounted (): void {
    console.log('QrcodeScanner mounted')
    const config: Html5QrcodeCameraScanConfig = {
      fps: this.fps,
      qrbox: this.qrbox
    }
    this.html5QrcodeScanner = new Html5QrcodeScanner(
      'qr-code-full-region',
      config,
      false
    )
    this.html5QrcodeScanner.render(this.onScanSucess, this.onScanError)
  }

  public pause (): void {
    this.html5QrcodeScanner.pause()
  }

  public resume (): void {
    debugger
    this.html5QrcodeScanner.resume()
  }

  public stop (): void {
    // try {
    //   const html5Qrcode: Html5Qrcode = this.html5QrcodeScanner.html5Qrcode
    //   if (html5Qrcode.isScanning) {
    //     html5Qrcode.stop()
    //   }
    // } catch {
    // }
  }

  destroyed (): void {
    this.stop()
  }
}
</script>
