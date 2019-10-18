import { BootstrapDemoModule } from './bootstrap-demo.module';

describe('BootstrapDemoModule', () => {
  let bootstrapDemoModule: BootstrapDemoModule;

  beforeEach(() => {
    bootstrapDemoModule = new BootstrapDemoModule();
  });

  it('should create an instance', () => {
    expect(bootstrapDemoModule).toBeTruthy();
  });
});
