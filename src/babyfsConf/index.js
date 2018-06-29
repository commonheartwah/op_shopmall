let babyfsConf = {
    oEnv: '',
    nEnv: '',
};
if (window.location.href.indexOf('babyfs.cn') > -1) {
    babyfsConf.oEnv = 'https://op.babyfs.cn';
    babyfsConf.nEnv = 'https://opmall.babyfs.cn';
} else {
    babyfsConf.oEnv = '';
    babyfsConf.nEnv = '';
}
export default babyfsConf;
