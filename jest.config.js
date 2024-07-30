module.exports = {
    testEnvironment: 'node',
    reporters: [
        'default',
        ['jest-stare', {
            resultDir: 'jest-stare',
            reportTitle: 'Relatório de Testes',
            additionalResultsProcessors: ['jest-html-reporter']
        }]
    ]
}