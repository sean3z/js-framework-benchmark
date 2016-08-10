var _ = require('lodash');
var exec = require('child_process').execSync;
var fs = require('fs');
var path = require('path');

function frameworks(dir) {
	_.each(fs.readdirSync(dir), function(framework) {
		var p = path.join(dir, framework);
		if(fs.statSync(p).isDirectory() && p[0] !== '.') {
			versions(p)
		}
	});
}

function versions(framework) {
	_.each(fs.readdirSync(framework), function(version) {
		var p = path.join(framework, version);
		if(fs.statSync(p).isDirectory() && p[0] !== '.') {
			build(p);
		}
	});
}

function build(version) {
	exec('npm run build-prod', {
		cwd: version,
		stdio: 'inherit'
	});
}

frameworks('./frameworks');