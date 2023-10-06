module.exports = {
  // 配置信息
  apps: [
    {
      // 启动路径
      script: 'index.js',
      watch: '.',
    },
    {
      // 启动路径
      script: './service-worker/',
      watch: ['./service-worker'],
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
