setInterval(() => {
    if (window.__coverage__) {
        var obj = window.__coverage__
        var len = Object.keys(obj).length
        if (len > 1) {
            localStorage.setItem('coveragecollect', JSON.stringify(window.__coverage__))
        }
    }
}, 5000)

// console.log('进来了222222222222')
// coverage = getCoverageObject()
// if (!(coverage && Object.keys(coverage).length > 0)) {
//     res.setHeader('Content-type', 'text/plain');
//     return res.end('No coverage information has been collected'); //TODO: make this a fancy HTML report
// }

// prefix = prefix || '';
// if (prefix.charAt(prefix.length - 1) !== '/') {
//     prefix += '/';
// }

// utils.removeDerivedInfo(coverage);

// collector.add(coverage);
// treeSummary = getTreeSummary(collector);
// pathMap = getPathMap(treeSummary);

// filePath = filePath || treeSummary.root.fullPath();

// outputNode = pathMap[filePath];

// if (!outputNode) {
//     res.statusCode = 404;
//     return res.end('No coverage for file path [' + filePath + ']');
// }

// linkMapper = {
//     hrefFor: function (node) {
//         return 'https://10.23.176.55:8988' + prefix + 'show?p=' + node.fullPath();
//     },
//     fromParent: function (node) {
//         return this.hrefFor(node);
//     },
//     ancestor: function (node, num) {
//         var i;
//         for (i = 0; i < num; i += 1) {
//             node = node.parent;
//         }
//         return this.hrefFor(node);
//     },
//     asset: function (node, name) { // 资源文件处理 resource files 
//         return 'https://10.23.176.55:8988' + prefix + 'asset/' + name;
//     }
// };
// report = Report.create('html', { linkMapper: linkMapper });  // 处理最终的报告
// res.setHeader('Content-type', 'text/html');
// if (outputNode.kind === 'dir') {
//     report.writeIndexPage(res, outputNode);
// } else {
//     fileCoverage = coverage[outputNode.fullPath()];
//     utils.addDerivedInfoForFile(fileCoverage);
//     report.writeDetailPage(res, outputNode, fileCoverage);
// }
// return res.end();