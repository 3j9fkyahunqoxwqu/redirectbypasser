"use strict";

var IS_KBE_KEY = (((typeof(KeyboardEvent) == "function") && ("key" in KeyboardEvent.prototype)) || (typeof(Components) != "undefined"));
var OPTS 	= {
	/* background */
	version					: "2.1.3",
	allowedProtocols		: "http|https|ftp|magnet",
	maxCaptureRecursion		: 50,
	excludedAttr			: "href|style|codebase|pluginspage",
	language				: "auto",
	useFallbackRule			: true,
	extOrder				: "webm|mpg|avi|wmv|rm|rmvb|mp4|asf|flv|swf|mp3|wav|wma|mid|ogg|torrent|zip|rar|7z|pdf|jpg|jpe|jpeg|gif|png|bmp|ico|svg|htm|html|asp|php|exe|bat|reg|sh|bin",
	/* content */
	highlightLink			: false,
	openInNewPage			: 0, /* 0:default, 1:new page, 2:background */
	menuEnable				: true,
	menuHideIfSingleRedir	: false,
	replaceUrl				: false,
	replaceOnlySingleRedir	: true,
	keysShowPopup			: "",
	keysOpenAsDownload		: ((IS_KBE_KEY)? "S" : "U+0053"),
	keysPreventReferrer		: ((IS_KBE_KEY)? "A" : "U+0041"),
	keysAddSiterule			: ((IS_KBE_KEY)? "X" : "U+0058"),
	menuShowDelay			: 400,
	menuHideDelay			: 200,
	menuOpacity				: 1,
	menuOpacityHover		: 1,
	menuShadowDepth			: 0,
	iconSize				: 22,
	tooltipFontSize			: 12,
	tooltipColor			: "#FFFFFF",
	tooltipBackgroundColor	: "#000000",
	tooltipShowIcon			: true,
	useDeobfuscator			: true,
	getFromTagText			: true,
	getFromAttributes		: true,
	getFromPlugins			: false,
	watchNodeInserted		: true,
	watchAttrModified		: true,
	/* content simple */
	scriptEnabled			: true,
	keysToggleEnable		: ((IS_KBE_KEY)? "SHIFT,C,X" : "SHIFT,U+0043,U+0058"),
	keysToggleEnableTemp	: ((IS_KBE_KEY)? "SHIFT,X,Z" : "SHIFT,U+0058,U+005A")
}

var SITESRULES = {
	ignore: ["*://www.facebook.com*"],
	rules: [
		[["*://www.google.<tld>/imgres*"], ["imgrefurl"]],
		[["*://example.<tld>/*"], ["@attribute", "*.avi", "*.html", "#base64"]]
	]
};

var rb = new function() {
	var rb				= this;
	var RE 				= {};
	var tlds			= "(?:demon\\.co\\.uk|esc\\.edu\\.ar|(?:c[oi]\\.)?[^\\.]\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.(?:(?:pvt\\.)?k12|cc|tec|lib|state|gen)\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nvus|ne|gg|tr|mm|ki|biz|sj|my|hn|gl|ro|tn|co|br|coop|cy|bo|ck|tc|bv|ke|aero|cs|dm|km|bf|af|mv|ls|tm|jm|pg|ky|ga|pn|sv|mq|hu|za|se|uy|iq|ai|com|ve|na|ba|ph|xxx|no|lv|tf|kz|ma|in|id|si|re|om|by|fi|gs|ir|li|tz|td|cg|pa|am|tv|jo|bi|ee|cd|pk|mn|gd|nz|as|lc|ae|cn|ag|mx|sy|cx|cr|vi|sg|bm|kh|nr|bz|vu|kw|gf|al|uz|eh|int|ht|mw|gm|bg|gu|info|aw|gy|ac|ca|museum|sk|ax|es|kp|bb|sa|et|ie|tl|org|tj|cf|im|mk|de|pro|md|fm|cl|jp|bn|vn|gp|sm|ar|dj|bd|mc|ug|nu|ci|dk|nc|rw|aq|name|st|hm|mo|gq|ps|ge|ao|gr|va|is|mt|gi|la|bh|ms|bt|gb|it|wf|sb|ly|ng|gt|lu|il|pt|mh|eg|kg|pf|um|fr|sr|vg|fj|py|pm|sn|sd|au|sl|gh|us|mr|dz|ye|kn|cm|arpa|bw|lk|mg|tk|su|sc|ru|travel|az|ec|mz|lb|ml|bj|edu|pr|fk|lr|nf|np|do|mp|bs|to|cu|ch|yu|eu|mu|ni|pw|pl|gov|pe|an|ua|uk|gw|tp|kr|je|tt|net|fo|jobs|yt|cc|sh|io|zm|hk|th|so|er|cz|lt|mil|hr|gn|be|qa|cv|vc|tw|ws|ad|sz|at|tg|zw|nl|info\\.tn|org\\.sd|med\\.sd|com\\.hk|org\\.ai|edu\\.sg|at\\.tt|mail\\.pl|net\\.ni|pol\\.dz|hiroshima\\.jp|org\\.bh|edu\\.vu|net\\.im|ernet\\.in|nic\\.tt|com\\.tn|go\\.cr|jersey\\.je|bc\\.ca|com\\.la|go\\.jp|com\\.uy|tourism\\.tn|com\\.ec|conf\\.au|dk\\.org|shizuoka\\.jp|ac\\.vn|matsuyama\\.jp|agro\\.pl|yamaguchi\\.jp|edu\\.vn|yamanashi\\.jp|mil\\.in|sos\\.pl|bj\\.cn|net\\.au|ac\\.ae|psi\\.br|sch\\.ng|org\\.mt|edu\\.ai|edu\\.ck|ac\\.yu|org\\.ws|org\\.ng|rel\\.pl|uk\\.tt|com\\.py|aomori\\.jp|co\\.ug|video\\.hu|net\\.gg|org\\.pk|id\\.au|gov\\.zw|mil\\.tr|net\\.tn|org\\.ly|re\\.kr|mil\\.ye|mil\\.do|com\\.bb|net\\.vi|edu\\.na|co\\.za|asso\\.re|nom\\.pe|edu\\.tw|name\\.et|jl\\.cn|gov\\.ye|ehime\\.jp|miyazaki\\.jp|kanagawa\\.jp|gov\\.au|nm\\.cn|he\\.cn|edu\\.sd|mod\\.om|web\\.ve|edu\\.hk|medecin\\.fr|org\\.cu|info\\.au|edu\\.ve|nx\\.cn|alderney\\.gg|net\\.cu|org\\.za|mb\\.ca|com\\.ye|edu\\.pa|fed\\.us|ac\\.pa|alt\\.na|mil\\.lv|fukuoka\\.jp|gen\\.in|gr\\.jp|gov\\.br|gov\\.ac|id\\.fj|fukui\\.jp|hu\\.com|org\\.gu|net\\.ae|mil\\.ph|ltd\\.je|alt\\.za|gov\\.np|edu\\.jo|net\\.gu|g12\\.br|org\\.tn|store\\.co|fin\\.tn|ac\\.nz|gouv\\.fr|gov\\.il|org\\.ua|org\\.do|org\\.fj|sci\\.eg|gov\\.tt|cci\\.fr|tokyo\\.jp|net\\.lv|gov\\.lc|ind\\.br|ca\\.tt|gos\\.pk|hi\\.cn|net\\.do|co\\.tv|web\\.co|com\\.pa|com\\.ng|ac\\.ma|gov\\.bh|org\\.zw|csiro\\.au|lakas\\.hu|gob\\.ni|gov\\.fk|org\\.sy|gov\\.lb|gov\\.je|ed\\.cr|nb\\.ca|net\\.uy|com\\.ua|media\\.hu|com\\.lb|nom\\.pl|org\\.br|hk\\.cn|co\\.hu|org\\.my|gov\\.dz|sld\\.pa|gob\\.pk|net\\.uk|guernsey\\.gg|nara\\.jp|telememo\\.au|k12\\.tr|org\\.nz|pub\\.sa|edu\\.ac|com\\.dz|edu\\.lv|edu\\.pk|com\\.ph|net\\.na|net\\.et|id\\.lv|au\\.com|ac\\.ng|com\\.my|net\\.cy|unam\\.na|nom\\.za|net\\.np|info\\.pl|priv\\.hu|rec\\.ve|ac\\.uk|edu\\.mm|go\\.ug|ac\\.ug|co\\.dk|net\\.tt|oita\\.jp|fi\\.cr|org\\.ac|aichi\\.jp|org\\.tt|edu\\.bh|us\\.com|ac\\.kr|js\\.cn|edu\\.ni|com\\.mt|fam\\.pk|experts-comptables\\.fr|or\\.kr|org\\.au|web\\.pk|mil\\.jo|biz\\.pl|org\\.np|city\\.hu|org\\.uy|auto\\.pl|aid\\.pl|bib\\.ve|mo\\.cn|br\\.com|dns\\.be|sh\\.cn|org\\.mo|com\\.sg|me\\.uk|gov\\.kw|eun\\.eg|kagoshima\\.jp|ln\\.cn|seoul\\.kr|school\\.fj|com\\.mk|e164\\.arpa|rnu\\.tn|pro\\.ae|org\\.om|gov\\.my|net\\.ye|gov\\.do|co\\.im|org\\.lb|plc\\.co\\.im|net\\.jp|go\\.id|net\\.tw|gov\\.ai|tlf\\.nr|ac\\.im|com\\.do|net\\.py|tozsde\\.hu|com\\.na|tottori\\.jp|net\\.ge|gov\\.cn|org\\.bb|net\\.bs|ac\\.za|rns\\.tn|biz\\.pk|gov\\.ge|org\\.uk|org\\.fk|nhs\\.uk|net\\.bh|tm\\.za|co\\.nz|gov\\.jp|jogasz\\.hu|shop\\.pl|media\\.pl|chiba\\.jp|city\\.za|org\\.ck|net\\.id|com\\.ar|gon\\.pk|gov\\.om|idf\\.il|net\\.cn|prd\\.fr|co\\.in|or\\.ug|red\\.sv|edu\\.lb|k12\\.ec|gx\\.cn|net\\.nz|info\\.hu|ac\\.zw|info\\.tt|com\\.ws|org\\.gg|com\\.et|ac\\.jp|ac\\.at|avocat\\.fr|org\\.ph|sark\\.gg|org\\.ve|tm\\.pl|net\\.pg|gov\\.co|com\\.lc|film\\.hu|ishikawa\\.jp|hotel\\.hu|hl\\.cn|edu\\.ge|com\\.bm|ac\\.om|tec\\.ve|edu\\.tr|cq\\.cn|com\\.pk|firm\\.in|inf\\.br|gunma\\.jp|gov\\.tn|oz\\.au|nf\\.ca|akita\\.jp|net\\.sd|tourism\\.pl|net\\.bb|or\\.at|idv\\.tw|dni\\.us|org\\.mx|conf\\.lv|net\\.jo|nic\\.in|info\\.vn|pe\\.kr|tw\\.cn|org\\.eg|ad\\.jp|hb\\.cn|kyonggi\\.kr|bourse\\.za|org\\.sb|gov\\.gg|net\\.br|mil\\.pe|kobe\\.jp|net\\.sa|edu\\.mt|org\\.vn|yokohama\\.jp|net\\.il|ac\\.cr|edu\\.sb|nagano\\.jp|travel\\.pl|gov\\.tr|com\\.sv|co\\.il|rec\\.br|biz\\.om|com\\.mm|com\\.az|org\\.vu|edu\\.ng|com\\.mx|info\\.co|realestate\\.pl|mil\\.sh|yamagata\\.jp|or\\.id|org\\.ae|greta\\.fr|k12\\.il|com\\.tw|gov\\.ve|arts\\.ve|cul\\.na|gov\\.kh|org\\.bm|etc\\.br|or\\.th|ch\\.vu|de\\.tt|ind\\.je|org\\.tw|nom\\.fr|co\\.tt|net\\.lc|intl\\.tn|shiga\\.jp|pvt\\.ge|gov\\.ua|org\\.pe|net\\.kh|co\\.vi|iwi\\.nz|biz\\.vn|gov\\.ck|edu\\.eg|zj\\.cn|press\\.ma|ac\\.in|eu\\.tt|art\\.do|med\\.ec|bbs\\.tr|gov\\.uk|edu\\.ua|eu\\.com|web\\.do|szex\\.hu|mil\\.kh|gen\\.nz|okinawa\\.jp|mob\\.nr|edu\\.ws|edu\\.sv|xj\\.cn|net\\.ru|dk\\.tt|erotika\\.hu|com\\.sh|cn\\.com|edu\\.pl|com\\.nc|org\\.il|arts\\.co|chirurgiens-dentistes\\.fr|net\\.pa|takamatsu\\.jp|net\\.ng|org\\.hu|net\\.in|net\\.vu|gen\\.tr|shop\\.hu|com\\.ae|tokushima\\.jp|za\\.com|gov\\.eg|co\\.jp|uba\\.ar|net\\.my|biz\\.et|art\\.br|ac\\.fk|gob\\.pe|com\\.bs|co\\.ae|de\\.net|net\\.eg|hyogo\\.jp|edunet\\.tn|museum\\.om|nom\\.ve|rnrt\\.tn|hn\\.cn|com\\.fk|edu\\.dz|ne\\.kr|co\\.je|sch\\.uk|priv\\.pl|sp\\.br|net\\.hk|name\\.vn|com\\.sa|edu\\.bm|qc\\.ca|bolt\\.hu|per\\.kh|sn\\.cn|mil\\.id|kagawa\\.jp|utsunomiya\\.jp|erotica\\.hu|gd\\.cn|net\\.tr|edu\\.np|asn\\.au|com\\.gu|ind\\.tn|mil\\.br|net\\.lb|nom\\.co|org\\.la|mil\\.pl|ac\\.il|gov\\.jo|com\\.kw|edu\\.sh|otc\\.au|gmina\\.pl|per\\.sg|gov\\.mo|int\\.ve|news\\.hu|sec\\.ps|ac\\.pg|health\\.vn|sex\\.pl|net\\.nc|qc\\.com|idv\\.hk|org\\.hk|gok\\.pk|com\\.ac|tochigi\\.jp|gsm\\.pl|law\\.za|pro\\.vn|edu\\.pe|info\\.et|sch\\.gg|com\\.vn|gov\\.bm|com\\.cn|mod\\.uk|gov\\.ps|toyama\\.jp|gv\\.at|yk\\.ca|org\\.et|suli\\.hu|edu\\.my|org\\.mm|co\\.yu|int\\.ar|pe\\.ca|tm\\.hu|net\\.sb|org\\.yu|com\\.ru|com\\.pe|edu\\.kh|edu\\.kw|org\\.qa|med\\.om|net\\.ws|org\\.in|turystyka\\.pl|store\\.ve|org\\.bs|mil\\.uy|net\\.ar|iwate\\.jp|org\\.nc|us\\.tt|gov\\.sh|nom\\.fk|go\\.th|gov\\.ec|com\\.br|edu\\.do|gov\\.ng|pro\\.tt|sapporo\\.jp|net\\.ua|tm\\.fr|com\\.lv|com\\.mo|edu\\.uk|fin\\.ec|edu\\.ps|ru\\.com|edu\\.ec|ac\\.fj|net\\.mm|veterinaire\\.fr|nom\\.re|ingatlan\\.hu|fr\\.vu|ne\\.jp|int\\.co|gov\\.cy|org\\.lv|de\\.com|nagasaki\\.jp|com\\.sb|gov\\.za|org\\.lc|com\\.fj|ind\\.in|or\\.cr|sc\\.cn|chambagri\\.fr|or\\.jp|forum\\.hu|tmp\\.br|reklam\\.hu|gob\\.sv|com\\.pl|saitama\\.jp|name\\.tt|niigata\\.jp|sklep\\.pl|nom\\.ni|co\\.ma|net\\.la|co\\.om|pharmacien\\.fr|port\\.fr|mil\\.gu|au\\.tt|edu\\.gu|ngo\\.ph|com\\.ve|ac\\.th|gov\\.fj|barreau\\.fr|net\\.ac|ac\\.je|org\\.kw|sport\\.hu|ac\\.cn|net\\.bm|ibaraki\\.jp|tel\\.no|org\\.cy|edu\\.mo|gb\\.net|kyoto\\.jp|sch\\.sa|com\\.au|edu\\.lc|fax\\.nr|gov\\.mm|it\\.tt|org\\.jo|nat\\.tn|mil\\.ve|be\\.tt|org\\.az|rec\\.co|co\\.ve|gifu\\.jp|net\\.th|hokkaido\\.jp|ac\\.gg|go\\.kr|edu\\.ye|qh\\.cn|ab\\.ca|org\\.cn|no\\.com|co\\.uk|gov\\.gu|de\\.vu|miasta\\.pl|kawasaki\\.jp|co\\.cr|miyagi\\.jp|org\\.jp|osaka\\.jp|web\\.za|net\\.za|gov\\.pk|gov\\.vn|agrar\\.hu|asn\\.lv|org\\.sv|net\\.sh|org\\.sa|org\\.dz|assedic\\.fr|com\\.sy|net\\.ph|mil\\.ge|es\\.tt|mobile\\.nr|co\\.kr|ltd\\.uk|ac\\.be|fgov\\.be|geek\\.nz|ind\\.gg|net\\.mt|maori\\.nz|ens\\.tn|edu\\.py|gov\\.sd|gov\\.qa|nt\\.ca|com\\.pg|org\\.kh|pc\\.pl|com\\.eg|net\\.ly|se\\.com|gb\\.com|edu\\.ar|sch\\.je|mil\\.ac|mil\\.ar|okayama\\.jp|gov\\.sg|ac\\.id|co\\.id|com\\.ly|huissier-justice\\.fr|nic\\.im|gov\\.lv|nu\\.ca|org\\.sg|com\\.kh|org\\.vi|sa\\.cr|lg\\.jp|ns\\.ca|edu\\.co|gov\\.im|edu\\.om|net\\.dz|org\\.pl|pp\\.ru|tm\\.mt|org\\.ar|co\\.gg|org\\.im|edu\\.qa|org\\.py|edu\\.uy|targi\\.pl|com\\.ge|gub\\.uy|gov\\.ar|ltd\\.gg|fr\\.tt|net\\.qa|com\\.np|ass\\.dz|se\\.tt|com\\.ai|org\\.ma|plo\\.ps|co\\.at|med\\.sa|net\\.sg|kanazawa\\.jp|com\\.fr|school\\.za|net\\.pl|ngo\\.za|net\\.sy|ed\\.jp|org\\.na|net\\.ma|asso\\.fr|police\\.uk|powiat\\.pl|govt\\.nz|sk\\.ca|tj\\.cn|mil\\.ec|com\\.jo|net\\.mo|notaires\\.fr|avoues\\.fr|aeroport\\.fr|yn\\.cn|gov\\.et|gov\\.sa|gov\\.ae|com\\.tt|art\\.dz|firm\\.ve|com\\.sd|school\\.nz|edu\\.et|gob\\.pa|telecom\\.na|ac\\.cy|gz\\.cn|net\\.kw|mobil\\.nr|nic\\.uk|co\\.th|com\\.vu|com\\.re|belgie\\.be|nl\\.ca|uk\\.com|com\\.om|utazas\\.hu|presse\\.fr|co\\.ck|xz\\.cn|org\\.tr|mil\\.co|edu\\.cn|net\\.ec|on\\.ca|konyvelo\\.hu|gop\\.pk|net\\.om|info\\.ve|com\\.ni|sa\\.com|com\\.tr|sch\\.sd|fukushima\\.jp|tel\\.nr|atm\\.pl|kitakyushu\\.jp|com\\.qa|firm\\.co|edu\\.tt|games\\.hu|mil\\.nz|cri\\.nz|net\\.az|org\\.ge|mie\\.jp|net\\.mx|sch\\.ae|nieruchomosci\\.pl|int\\.vn|edu\\.za|com\\.cy|wakayama\\.jp|gov\\.hk|org\\.pa|edu\\.au|gov\\.in|pro\\.om|2000\\.hu|szkola\\.pl|shimane\\.jp|co\\.zw|gove\\.tw|com\\.co|net\\.ck|net\\.pk|net\\.ve|org\\.ru|uk\\.net|org\\.co|uu\\.mt|com\\.cu|mil\\.za|plc\\.uk|lkd\\.co\\.im|gs\\.cn|sex\\.hu|net\\.je|kumamoto\\.jp|mil\\.lb|edu\\.yu|gov\\.ws|sendai\\.jp|eu\\.org|ah\\.cn|net\\.vn|gov\\.sb|net\\.pe|nagoya\\.jp|geometre-expert\\.fr|net\\.fk|biz\\.tt|org\\.sh|edu\\.sa|saga\\.jp|sx\\.cn|org\\.je|org\\.ye|muni\\.il|kochi\\.jp|com\\.bh|org\\.ec|priv\\.at|gov\\.sy|org\\.ni|casino\\.hu|res\\.in|uy\\.com|futbol)";
	var SITESRULES_DATA	= [];
	
	rb.PAGE_DATA		= {};
	rb.PAGE_DATA_SIMPLE	= {};
	
	rb.optsBuild = function(optsNew) {
		var version = OPTS.version;
		
		optsNew && Object.keys(OPTS).forEach(function(key) {
			var ont = typeof(optsNew[key]);
			
			if (ont != "undefined") {
				var ort = typeof(OPTS[key]), onv = optsNew[key];
				
				if (ont == ort) {
					OPTS[key] = onv;
					
				} else {
					OPTS[key] = ((ort == "string")
						? ((onv && "" + onv) || "")
						: ((ort == "boolean")
							? !(onv == "0" || onv == "false" || onv == "undefined" || onv == "null" || !onv)
							: ((ort == "number")? +onv || 0 : "")
						)
					);
				}
			}
		});
		
		OPTS.version = version;
		
		var allowedProtocols	= OPTS.allowedProtocols.split(/((?:[^\|\\]+|\\.)*)\|/).filter(Boolean);
		var bs64 				= "(?:(?:" + allowedProtocols.map(function(str) {
			return btoa(str + ":").replace(/=/g, "");
		}).join("|") + "|(?=[^=\/]*[A-Za-z0-9+\/][A-Z]*[A-Z][a-z]))[A-Za-z0-9=]+)";
		
		RE["IS_EXCLUDED_ATTR"] 							= RegExp("^(" + OPTS.excludedAttr + ")$", "i");
		RE["CONTAINS_URL"] 								= RegExp("www\\.|ftp\\.|(" + OPTS.allowedProtocols + ")(?::|%3A|%25)", "i");
		RE["CONTAINS_URL_MIDDLE"] 						= RegExp("[^^](?:" + OPTS.allowedProtocols + ")(?::|%3A|%25)|[^/]/?www\\d{0,3}[.]", "i");/*FIXME*/
		RE["MATCH_URLS"]								= RegExp("\\b(?:(?:" + OPTS.allowedProtocols + ")(:|(?:%(?:[^%]*25)?3A))|www\\.|ftp\\.)(?:\\([-A-Z0-9+&@#/%=~_\\u00B1-\\uFFFF|$?!:,.]*\\)|[-A-Z0-9+&@#/%=~_\\u00B1-\\uFFFF|$?!:,.])*(?:\\([-A-Z0-9+&@#/%=~_\\u00B1-\\uFFFF|$?!:,.]*\\)|[A-Z0-9+&@#/%=~_\\u00B1-\\uFFFF|$])", "gi");
		RE["STARTSWITH_ALLOWEDPROTOCOL"] 				= RegExp("^(?:" + OPTS.allowedProtocols + ")(?::|%3A|%25)", "i");
		RE["CONTAINS_REVERSEENCODED_ALLOWEDPROTOCOL"] 	= RegExp("(:|\\x253A)(" + stringReverse(OPTS.allowedProtocols) + ")", "i");
		RE["CONTAINS_BASE64ENCODED"] 					= RegExp("[A-Z]{2}[a-z]{2}|" + bs64); /*FIXME*/
		RE["MATCH_BASE64ENCODED"] 						= RegExp(bs64, "g"); /*FIXME*/
		RE["CONTAINS_HEXENCODED_ALLOWEDPROTOCOL"] 		= RegExp("(" + allowedProtocols.map(function(str) {
			var h = "0123456789ABCDEF", r = "";
			str += ":";
			
			for (var i = 0, n; i < str.length; i++) { 
				n = str.charCodeAt(i);
				r += h.charAt(n >> 4) + h.charAt(n & 0xF);
			}
			
			return r;
		}).join("|") + ")[^=?&]*", "i");
		
		rb.PAGE_DATA = {
			REGEXPS: {
				"IS_EXCLUDED_ATTR"		: RE["IS_EXCLUDED_ATTR"].source,
				"CONTAINS_URL"			: RE["CONTAINS_URL"].source,
				"CONTAINS_URL_TESTER"	: "(" + RE["CONTAINS_URL_MIDDLE"].source + ")"
				+ ((OPTS.useDeobfuscator)
					? "|(" + RE["CONTAINS_REVERSEENCODED_ALLOWEDPROTOCOL"].source + ")"
					+ "|(" + RE["CONTAINS_BASE64ENCODED"].source + ")"
					+ "|(" + RE["CONTAINS_HEXENCODED_ALLOWEDPROTOCOL"].source + ")"
					: ""
				),
			},
			OPTS: {}
		};
		
		rb.PAGE_DATA_SIMPLE = {
			OPTS: {}
		};
		
		[	"highlightLink",
			"openInNewPage",
			"menuEnable",
			"menuHideIfSingleRedir",
			"replaceUrl",
			"keysShowPopup",
			"keysOpenAsDownload",
			"keysPreventReferrer",
			"keysAddSiterule",
			"menuShowDelay",
			"menuHideDelay",
			"menuOpacity",
			"menuOpacityHover",
			"menuShadowDepth",
			"iconSize",
			"tooltipFontSize",
			"tooltipColor",
			"tooltipBackgroundColor",
			"tooltipShowIcon",
			"getFromTagText",
			"getFromAttributes",
			"getFromPlugins",
			"watchNodeInserted",
			"watchAttrModified"
		].forEach(function(key) {
			rb.PAGE_DATA.OPTS[key] = OPTS[key];
		});
		
		["scriptEnabled", "keysToggleEnable", "keysToggleEnableTemp"].forEach(function(key) {
			rb.PAGE_DATA.OPTS[key]			= OPTS[key];
			rb.PAGE_DATA_SIMPLE.OPTS[key]	= OPTS[key];
		});
		
		return (!optsNew || (optsNew.version < version));
	}
	
	rb.sitesFilterRules = function(sitesRules) {
		var params = {};
		
		sitesRules.ignore = sitesRules.ignore.filter(function(item, pos) {
			return (sitesRules.ignore.indexOf(item) == pos);
		});
		
		sitesRules.rules.forEach(function(rule) {
			var isOriginal		= false;
			var rulePatterns	= rule[0].filter(function(item, pos) {
				return ((sitesRules.ignore.indexOf(item) === -1) && (rule[0].indexOf(item) == pos));
			});
			
			var ruleParams = rule[1].filter(function(item, pos) {
				if (item.toLowerCase() == "original") {
					isOriginal = true;
				}
				
				return (!isOriginal && (rule[1].indexOf(item) == pos));
			});
			
			Object.keys(params).forEach(function(key) {
				var param = params[key], c = rulePatterns.length;
				
				while (c--) {
					var pInP = param.patterns.indexOf(rulePatterns[c]);
					
					if (pInP !== -1) {
						isOriginal && param.patterns.splice(pInP, 1);
						((ruleParams.length === 1) && (param.params.indexOf(ruleParams[0]) !== -1)) && rulePatterns.pop();
					}
				}
				
				if (!param.patterns.length || !param.params.length) {
					delete params[k];
				}
			});
			
			if (!isOriginal && rulePatterns.length && ruleParams.length) {
				var ruleParamsID = ruleParams.join(",");
				
				if (params[ruleParamsID]) {
					if (params[ruleParamsID].patterns.sort().join(",") !== rulePatterns.sort().join(",")) {
						params[ruleParamsID].patterns = params[ruleParamsID].patterns.concat(rulePatterns);
					}
					
				} else {
					params[ruleParamsID] = {patterns: rulePatterns, params: ruleParams};
				}
			}
			
		});
		
		sitesRules.rules.length = 0;
		
		Object.keys(params).forEach(function(key) {
			sitesRules.rules.push([params[key].patterns, params[key].params]);
		});
		
		return sitesRules;
	}
	
	/**
		SITESRULE = [is Ext?, RegExp, is Ext?, RegExp,...]
		SITESRULES_DATA = [SITESRULE, ...]
	*/
	rb.sitesBuildRules = function(sitesRules) {
		var globalPatternGroup = [];
		SITESRULES_DATA.length = 0;
		RE["SITES_RULES_INDEX"] = null;
		RE["SITES_RULES_IGNORE"] = null;
		
		if (sitesRules && sitesRules.rules && sitesRules.ignore) {
			var isExt = function(str) {
				return (str && (str.indexOf("*.") === 0));
			};
			
			sitesRules.rules.forEach(function(rule) {
				var localPatternGroup = [], c = 0, siteRule = [];
				
				rule[0].forEach(function(pattern) {
					localPatternGroup.push(convert2RegExp(pattern));
				})
				
				while (c < rule[1].length) {
					var isE = isExt(rule[1][c]);
					var idxGroup = [];
					
					while ((c < rule[1].length) && (isE == isExt(rule[1][c]))) {
						idxGroup.push(((isE)? rule[1][c].substr(2) : rule[1][c]).replace(/[\$\(\)\*\+\-\.\/\?\[\\\]\^\{\|\}]/g, "\\$&"));
						c++;
					}
					
					siteRule.push(isE, RegExp("^(" + idxGroup.join("|") + ")$", "i"));
				}
				
				if (siteRule.length) {
					globalPatternGroup.push(((globalPatternGroup.length)? "|" : "") + "(" + localPatternGroup.join("|") + ")");
					SITESRULES_DATA.push(siteRule);
				}
			});
			
			if (globalPatternGroup.length) {
				RE["SITES_RULES_INDEX"] = RegExp("^(?:" + globalPatternGroup.join("") + ")$", "i");
			}
			
			globalPatternGroup = [];
			
			sitesRules.ignore.forEach(function(item) {
				var localPatternGroup = [];
				localPatternGroup.push(convert2RegExp(item));
				globalPatternGroup.push(((globalPatternGroup.length)? "|" : "") + localPatternGroup.join("|"));
			});
			
			if (globalPatternGroup.length) {
				RE["SITES_RULES_IGNORE"] = RegExp("^" + globalPatternGroup.join("") + "$", "i");
			}
		}
	}
	
	rb.sitesGetTop = function(links) {
		if (RE["SITES_RULES_INDEX"] && RE["SITES_RULES_IGNORE"] && !RE["SITES_RULES_IGNORE"].test(links.base.url)) {
			var re = RE["SITES_RULES_INDEX"].exec(links.base.url);
			
			if (re) {
				var rules = SITESRULES_DATA[re.indexOf(re[0], 1) - 1];
				
				if (rules) {
					for (var i = 0, l = rules.length - 1; i < l; i += 2) {
						for (var ii = 0, ll = links.list.length, link; ii < ll; ii++) {
							link = links.list[links.index[ii]];
							
							if (rules[i] /* is ext */) {
								var ext = link.url.match(/\.([^\.\/?#]+)(?:[\?#]|$)/);
								
								if (rules[i + 1].test((ext)? ext[1] : "html")) {
									return links.index[ii];
								}
								
							} else {
								if (link.info.length && rules[i + 1].test(link.info.join(","))) {
									return links.index[ii];
								}
							}
						}
					}
				}
			}
			
			//FIXME:host vs host
			if (OPTS.useFallbackRule) {
				var top			= [-1, ""];
				var rxpPage		= /^(htm|html|asp|php)$/i;
				var rxpImage	= /^(jpg|jpe|jpeg|gif|png|bmp|ico|svg)$/i;
				var rxpVideo	= /^(mov|mpg|avi|wmv|mpe|mpeg|rm|ram|rmvb|mp4|asf|flv|m4v|webm)$/i;
				var rxpAudio	= /^(mp3|wav|wma|ra|mid|m3u|asx|ogg)$/i;
				var rxpHash		= /(\.\w{2,8}\.\w{3,8})|([^\/\.\?\-_#%&=:aeiuo0-9]{4}|\d[^\/\.\?\-_#%&=:aeiuo0-9]{3}|[a-z]\d[a-z]{2})[\da-z]/gi;
				var exts		= [];
				var paths		= [];
				var infos		= [];
				
				for (var i = 0, l = links.index.length; i < l; i++) {
					var ext = links.index[i].match(/\.([^\.\/?#]+)(?:[\?#]|$)/);
					var path = links.index[i].match(/[^\/:]+(?:\/|\?)(.+)/);
					
					exts.push(((ext)? ext[1].toLowerCase() : "html"));
					paths.push(((path)? path[1] : ""));
					infos.push(links.list[links.index[i]].info.join(""));
				}
				
				for (var i = 0, l = links.index.length; i < l; i++) {
					var info = links.list[links.index[i]].info, score = 0;
					
					score += ((rxpVideo.test(exts[i]) && 4) || (rxpAudio.test(exts[i]) && 2) || ((infos[i].indexOf("@") > -1) && -2));
					score += ((/#(base64|hex|reverse)/i).test(infos[i]) && 2) + ((infos[i].indexOf("#text") > -1) && -4) + !!paths[i];
					score += ((l > 1)
						? (!!paths[i] && rxpPage.test(exts[i]) && rxpHash.test(paths[i]) && 2)
						+ (info.length < 2) + (rxpImage.test(exts[i]) && -2)
						: 0
					);
					
					if (score > top[0]) {
						top = [score, links.index[i]];
					}
				}
				
				return top[1];
			}
		}
	}
	
	rb.linkProcess = function(data) {
		var d = document.createElementNS("http://www.w3.org/1999/xhtml", "template");
		d.innerHTML = data.src;
		
		var target = d.content.firstChild;
		var nodeName = target.nodeName.toUpperCase();
		var isPlugin = /embed|object|video|audio/i.test(nodeName);
		var url = new URL(
			target.getAttribute("href") || target.getAttribute("data") || target.getAttribute("src") || "", data.baseURI
		).href;
		var links = {
			target		: target,
			targetID	: data.targetID,
			baseURI		: data.baseURI,
			base		: null,
			list		: {},
			index		: [url]
		};
		
		links.base = links.list[url] = {
			url				: url,
			info			: [],
			urlFixDone		: false,
			grabURLDone		: false,
			grabReverseDone	: false,
			grabBase64Done	: false,
			grabHexDone		: false
		};
		
		if (url) {
			if (OPTS.useDeobfuscator) {
				linkGrabReverse(links.base, links);
				
				if (url.indexOf("javascript:") === 0) {
					linkGrabRaw(url.match(RE["MATCH_URLS"]), links.base, links, null, function(args) {
						args[0].info.push("#javascript");
					});
				}
				
				linkGrabBase64(links.base, links);
				linkGrabHex(links.base, links);
			}
			
			linkGrabURL(links.base, links);
		}
		
		if ((OPTS.getFromAttributes && !isPlugin) || (OPTS.getFromPlugins && isPlugin)) {
			linkGrabAtts(links.base, links);
		}
		
		if (OPTS.getFromTagText && (nodeName == "A")) {
			linkGrabText(links.base, links);
		}
		
		if (OPTS.maxCaptureRecursion) {
			links.index.forEach(function(key) {
				linkGrabURL(links.list[key], links, OPTS.maxCaptureRecursion);
			});
		}
		
		links.index.splice(links.index.indexOf(url), 1);
		delete links.list[url];
		delete links.target;
		
		links.index.sort(function(a, b) {
			var mb = b.match(/\.([^\.\/?#]+)(?:[\?#]|$)/);
			var ma = ((mb)? a.match(/\.([^\.\/?#]+)(?:[\?#]|$)/) : null);
			mb = ((mb)? OPTS.extOrder.indexOf(mb[1].toLowerCase()) : -1);
			ma = ((ma && mb > -1)? OPTS.extOrder.indexOf(ma[1].toLowerCase()) : -1);
			
			return ((mb ==-1)? -1 : ((ma == -1)? 1 : ma - mb));
		});
		//FIXME:blob
		if (["VIDEO","AUDIO"].indexOf(nodeName) !== -1) {
			links.base.info.push("#" + nodeName.toLowerCase());
			links.index.unshift(links.base.url);
			links.list[links.base.url] = links.base;
			
		} else if (!isPlugin && links.index.length) {
			if (OPTS.replaceUrl && (!OPTS.replaceOnlySingleRedir || links.index.length == 1)) {
				links.replaceURL = rb.sitesGetTop(links);
				
				if (links.replaceURL) {
					links.index.splice(links.index.indexOf(links.replaceURL), 1);
					delete links.list[links.replaceURL];
					
					links.base.info = ["Original"];
					links.index.unshift(links.base.url);
					links.list[links.base.url] = links.base;
				}
			}
		}
		
		return links;
	}
	
	function stringReverse(s) {
		return s.split("").reverse().join("");
	}

	function stringHexDecode(s) {
		var r = "";
		
		for (var i = 0; i < s.length; i += 2) {
			r += String.fromCharCode(parseInt(s.substr(i, 2), 16));
		}
		
		return r;
	}
	
	function urlFix(url) {
		var rp = RegExp("^(" + OPTS.allowedProtocols + ")%(25|3A)", "i");
		var c = 7, ourl = url;
		
		//scheme fix
		if (!RE["STARTSWITH_ALLOWEDPROTOCOL"].test(url)) {
			if (RE["STARTSWITH_ALLOWEDPROTOCOL"].test("http:|https:")) {
				var m = url.match(/^(?:(:)|(\/\/)|(\/))/);
				url = ((m)? ((m[1])? "http" : ((m[2])? "http:" : ((m[3])? "http:/" : "" ))) : "http://") + url;
				
			} else {
				return "";
			}
		}
		
		//query fix
		var i = url.search(/&(?!amp;)/i);
		
		if (i !== -1) {
			var q = url.indexOf("?");
			
			if (q === -1 || i < q) {
				url = url.substring(0, i);
			}
		}
		
		//percent-encoding fix
		try {
			while (c-- && (rp.test(url) || (!(/=|&/.test(url)) && /%(25|3D|26|2F)/i.test(url)))) {
				url = decodeURIComponent(url);
			}
		} catch(err) {
			console.info("RedirectBypasser urlFix: URL: '%s', Original: '%s', Message: '%s'", url, ourl, err.message);
		}
		
		//javascript escapes
		if (/^(https?|ftp):\\\/\\\//.test(url)) {
			url = url.replace(/\\/g, "");
		}
		
		return ((RegExp("^(?:(?:(?!https?|ftp).+:)|(?:https?|ftp):\\/\\/[^\\/]+\\." + tlds + "(?:\\/|$))", "i").test(url))? url : "");
	}

	function linkAdd(link, links) {
		if (!link.urlFixDone) {
			link.url = urlFix(link.url);
			link.urlFixDone = true;
		}
		
		if (RE["STARTSWITH_ALLOWEDPROTOCOL"].test(link.url) && (links.index.indexOf(link.url) === -1) && (link.url != links.baseURI)) {
			link.info = link.info || [];
			links.index.push(link.url);
			links.list[link.url] = link;
			return link;
		}
	}
	
	//FIXME:
	function linkGrabURL(link, links, maxCaptureRecursion) {
		if (link.grabURLDone || ((link.recursion || 0) >= (maxCaptureRecursion || OPTS.maxCaptureRecursion))) {
			return;
		}
		
		var rxp = RegExp("(\\?|\\/|[^?&=]+=|%[a-f0-9]{2})(?:"
			+ OPTS.allowedProtocols + ")(?::|%3A|%25)|([^?=&]+[?=&])(?!https?|ftp)[^?=&%]+\\." + tlds + "[=&%]"
		, "gi");
		var urlIn = link.url;
		var result;
		
		link.recursion = (link.recursion || 0);
		
		while ((link.recursion <= (maxCaptureRecursion || OPTS.maxCaptureRecursion)) && (result = rxp.exec(urlIn)) !== null) {
			var resultParam = (result[1] || result[2]);
			var resultIndex = result.index;
			var keyOut = resultParam;
			var linkNew, urlOut, idx;
			
			if (/^[%?\/=]/.test(resultParam)) {
				urlOut = urlIn.substring(resultIndex + resultParam.length);
				
				if ((resultParam == "?") && (urlOut.indexOf("&") > 1)) {
					urlOut = urlOut.substring(0, urlOut.search(/&(?!amp;)/i));
					
				} else if (resultParam[0] == "%") {
					idx = urlOut.search(new RegExp(((resultParam.toLowerCase() == "%3d")? "%26" : resultParam) + "|&(?!amp;)", "i"));
					urlOut = urlOut.substring(0, ((idx > -1)? idx : urlIn.length));
					keyOut = urlIn.substring(0, resultIndex).split((resultParam.toLowerCase() == "%3d")? "%26" : resultParam).pop();
				}
				
			} else {
				idx = urlIn.indexOf("&", resultIndex + resultParam.length);
				urlOut = urlIn.substring(resultIndex + resultParam.length, ((idx > -1)? idx : urlIn.length));
			}
			
			try {
				keyOut = decodeURIComponent(keyOut).replace(/amp|[^\w]/gi, "");
			} catch(err) {
				console.info("RedirectBypasser linkGrabURL: '%o' %s", link, keyOut);
			}
			
			rxp.lastIndex = resultIndex + urlOut.length - 1;
			
			linkNew = linkAdd({
				url			: urlOut,
				info		: (link.info || []).concat((result[2])? ["#forced", keyOut] : keyOut),
				grabURLDone	: false,
			}, links);
			
			if (linkNew) {
				link.recursion++;
				
				if (RE["CONTAINS_URL_MIDDLE"].test(linkNew.url)) {
					linkGrabURL(linkNew, links,  (maxCaptureRecursion || OPTS.maxCaptureRecursion));
				}
				
				linkNew.grabURLDone = true;
			}
		}
		
		link.grabURLDone = true;
	}

	function linkGrabRaw(url, link, links, preFunc, posFunc) {
		if (url) {
			if (Array.isArray(url)) {
				for (var i = 0, l = url.length; i < l; i++) {
					linkGrabRaw(url[i], link, links, preFunc, posFunc);
				}
				
			} else {
				var arg = [url, link, links];
				
				if (!preFunc || !preFunc(arg)) {
					var urls = arg[0].match(RE["MATCH_URLS"]);
					
					if (urls) {
						for (var i = 0, l = urls.length; i < l; i++) {
							arg = [{url: urls[i], info: (link.info || []).slice(0), urlFixDone: false}, link, links];
							
							if (!posFunc || !posFunc(arg)) {
								if (!arg[0].urlFixDone) {
									arg[0].url = urlFix(arg[0].url);
								}
								
								linkAdd(arg[0], links);
							}
						}
					}
				}
			}
		}
	}
	
	function linkGrabAtts(link, links) {
		var target		= links.target;
		var isPlugin	= (["EMBED", "OBJECT"].indexOf(target.nodeName) !== -1);
		var qs			= "";
		var processAtts	= function(node) {
			var nodeName = node.nodeName.toUpperCase();
			
			if (nodeName == "SOURCE") {
				var linkNew = linkAdd({
					url			: urlFix(node.getAttribute("src")),
					info		: ["#" + target.nodeName.toLowerCase(), "@source", node.getAttribute("type")],
					grabURLDone	: false,
					urlFixDone	: true
				}, links);
				
				linkNew && linkGrabURL(linkNew, links);
				return;
			}
			
			for (var i = 0, attr; attr = node.attributes[i]; i++) {
				if (!RE["IS_EXCLUDED_ATTR"].test(attr.name) && RE["CONTAINS_URL"].test(attr.value)) {
					if (/^\s*\{[\s\S]+\}\s*$/.test(attr.value)) {
						var ms = attr.value.replace(/^\s*\{|\}\s*$/g, "").match(/([^\\\][^,]|\\,)+/g);
						var c = ((ms)? ms.length : 0); 
						
						while (c--) {
							if (ms[c].length > 10) {
								var key = ms[c];
								var idx = key.indexOf(":");
								
								if (idx !== -1) {
									linkGrabRaw(
										key.substring(idx + 1).replace(/^[\s"']*|[\s"']*$/g, ""),
										link,
										links,
										null,
										function(args) {
											if (isPlugin) {
												args[0].info.push("#plugin");
											}
											
											if (nodeName == "PARAM") {
												args[0].info.push("@param", node.getAttribute("name"));
												
											} else {
												args[0].info.push("@" + attr.name)
											}
											
											args[0].info.push(key.substring(0, idx).replace(/^[\s"']*|[\s"']*$/g, ""));
										}
									);
								}
							}
						}
						
					} else if ((attr.name == "flashvars") 
						|| (((nodeName == "PARAM") && (attr.name == "value")) && (node.getAttribute("name") == "flashvars"))
					) {
						linkGrabURL({url: attr.value, info: ["#plugin", "@flashvars"]}, links);
						
					} else {
						linkGrabRaw(attr.value, link, links, null, function(args) {
							if (isPlugin) {
								args[0].info.push("#plugin");
							}
							
							if (nodeName == "PARAM") {
								args[0].info.push("@param", node.getAttribute("name"));
							} else {
								args[0].info.push("@" + attr.name)
							}
						});
					}
					
					if (isPlugin) {
						qs += attr.name + "=" + attr.value + "&";
					}
				}
			}
		}
		
		processAtts(target);
		
		if (["OBJECT", "VIDEO", "AUDIO"].indexOf(target.nodeName) !== -1) {
			var nodes = target.getElementsByTagName((target.nodeName == "OBJECT")? "param" : "source");
			
			for (var i = 0, node; node = nodes[i]; i++) {
				processAtts(node);
			}
		}
		
		if (isPlugin) {
			var url = new URL((
				target.getAttribute("data") || target.getAttribute("movie") || (target.querySelector("param[name=\"movie\"]") || {}).value
				|| target.src
			), links.baseURI);
			
			url.search += qs;
			
			linkAdd({
				url				: urlFix(url.href),
				info			: ["#plugin"],
				urlFixDone		: true,
				grabURLDone		: true,
				grabReverseDone	: true,
				grabBase64Done	: true,
				grabHexDone		: true,
			}, links);
		}
	}

	function linkGrabReverse(link, links) {
		if (!link.grabReverseDone && RE["CONTAINS_REVERSEENCODED_ALLOWEDPROTOCOL"].test(link.url)) {
			var url = link.url;
			
			if (url.indexOf("javascript:") === 0) {
				linkGrabRaw(stringReverse(url), link, links, null, function(args) {
					args[0].info.push("#javascript", "#reverse");
				});
			}
			
			url = url.substr(url.indexOf("?") + 1);
			var r = stringReverse(url).split("?");
			
			if (r.length > 2) {
				r.shift();
			}

			url = r.join("?").replace(/\/([^\/?]*)=[^&?=]*/, "/$1").replace(/=([^?&]*)=([^&]*)/g, "=$1");
			
			if (RE["STARTSWITH_ALLOWEDPROTOCOL"].test(url)) {
				linkAdd({url: url, info: link.info.concat(["#reverse"])}, links);
				
			} else {
				r = url.split(/^([^=]+)=/g);
				
				if (r.length > 1) {
					linkAdd({url: r[2], info: link.info.concat(["#reverse", r[1]])}, links);
				}
			}
		}
		
		link.grabReverseDone = true;
	}
	
	function linkGrabText(link, links) {
		linkGrabRaw(links.target.textContent, link, links, null, function(args) {
			if (args[0].url.indexOf("...") !== -1) {
				return true;
			}
			
			args[0].info.push("#text");
		});
	}
	
	function linkGrabBase64(link, links) {
		if (!link.grabBase64Done && RE["CONTAINS_BASE64ENCODED"].test(link.url)) {
			linkGrabRaw(link.url.match(RE["MATCH_BASE64ENCODED"]), link, links, function(args) {
				args[0] += ((args[0].length % 4 != 0)? "=".repeat(4 - args[0].length % 4) : "");
				
				if ((args[0].length > 10) && !(/=[^=]|===$/).test(args[0])) {
					try {
						args[0] = atob(args[0]);
						return false;
					
					} catch(err) {
						console.info(
							"RedirectBypasser Base64: Length: '%s', Args: '%o', Site: '%s', Message: '%s'",
							args[0].length,
							args[0],
							links.baseURI,
							err.message
						);
					}
				}
				
				return true;
				
			}, function(args) {
				args[0].info.push("#base64");
			});
		}
		
		link.grabBase64Done = true;
	}

	function linkGrabHex(link, links) {
		if (!link.grabHexDone) {
			linkGrabRaw(link.url.match(RE["CONTAINS_HEXENCODED_ALLOWEDPROTOCOL"]), link, links, function(args) {
				args[0] = stringHexDecode(args[0]);
				
			}, function(args) {
				args[0].info.push("#hex");
			});
		}
		
		link.grabHexDone = true;
	}
	
	// Converts a pattern in this programs simple notation to a regular expression.
	// thanks AdBlock! http://www.mozdev.org/source/browse/adblock/adblock/
	function convert2RegExp( pattern ) {
		var s = new String(pattern);
		var res = new String("");
		
		for (var i = 0 ; i < s.length ; i++) {
			switch(s[i]) {
				case "*" :
					res += ".*";
					break;
				case "." :
				case "?" :
				case "^" :
				case "$" :
				case "+" :
				case "{" :
				case "[" :
				case "|" :
				case "(" :
				case ")" :
				case "]" :
					res += "\\" + s[i];
					break;
				case "\\" :
					res += "\\\\";
					break;
				case " " :
					// Remove spaces from URLs.
					break;
				default :
					res += s[i];
					break;
			}
		}
		
		return res.replace(/<tld>/g, "(?:demon\\.co\\.uk|esc\\.edu\\.ar|(?:c[oi]\\.)?[^\\.]\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.(?:(?:pvt\\.)?k12|cc|tec|lib|state|gen)\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nvus|ne|gg|tr|mm|ki|biz|sj|my|hn|gl|ro|tn|co|br|coop|cy|bo|ck|tc|bv|ke|aero|cs|dm|km|bf|af|mv|ls|tm|jm|pg|ky|ga|pn|sv|mq|hu|za|se|uy|iq|ai|com|ve|na|ba|ph|xxx|no|lv|tf|kz|ma|in|id|si|re|om|by|fi|gs|ir|li|tz|td|cg|pa|am|tv|jo|bi|ee|cd|pk|mn|gd|nz|as|lc|ae|cn|ag|mx|sy|cx|cr|vi|sg|bm|kh|nr|bz|vu|kw|gf|al|uz|eh|int|ht|mw|gm|bg|gu|info|aw|gy|ac|ca|museum|sk|ax|es|kp|bb|sa|et|ie|tl|org|tj|cf|im|mk|de|pro|md|fm|cl|jp|bn|vn|gp|sm|ar|dj|bd|mc|ug|nu|ci|dk|nc|rw|aq|name|st|hm|mo|gq|ps|ge|ao|gr|va|is|mt|gi|la|bh|ms|bt|gb|it|wf|sb|ly|ng|gt|lu|il|pt|mh|eg|kg|pf|um|fr|sr|vg|fj|py|pm|sn|sd|au|sl|gh|us|mr|dz|ye|kn|cm|arpa|bw|lk|mg|tk|su|sc|ru|travel|az|ec|mz|lb|ml|bj|edu|pr|fk|lr|nf|np|do|mp|bs|to|cu|ch|yu|eu|mu|ni|pw|pl|gov|pe|an|ua|uk|gw|tp|kr|je|tt|net|fo|jobs|yt|cc|sh|io|zm|hk|th|so|er|cz|lt|mil|hr|gn|be|qa|cv|vc|tw|ws|ad|sz|at|tg|zw|nl|info\\.tn|org\\.sd|med\\.sd|com\\.hk|org\\.ai|edu\\.sg|at\\.tt|mail\\.pl|net\\.ni|pol\\.dz|hiroshima\\.jp|org\\.bh|edu\\.vu|net\\.im|ernet\\.in|nic\\.tt|com\\.tn|go\\.cr|jersey\\.je|bc\\.ca|com\\.la|go\\.jp|com\\.uy|tourism\\.tn|com\\.ec|conf\\.au|dk\\.org|shizuoka\\.jp|ac\\.vn|matsuyama\\.jp|agro\\.pl|yamaguchi\\.jp|edu\\.vn|yamanashi\\.jp|mil\\.in|sos\\.pl|bj\\.cn|net\\.au|ac\\.ae|psi\\.br|sch\\.ng|org\\.mt|edu\\.ai|edu\\.ck|ac\\.yu|org\\.ws|org\\.ng|rel\\.pl|uk\\.tt|com\\.py|aomori\\.jp|co\\.ug|video\\.hu|net\\.gg|org\\.pk|id\\.au|gov\\.zw|mil\\.tr|net\\.tn|org\\.ly|re\\.kr|mil\\.ye|mil\\.do|com\\.bb|net\\.vi|edu\\.na|co\\.za|asso\\.re|nom\\.pe|edu\\.tw|name\\.et|jl\\.cn|gov\\.ye|ehime\\.jp|miyazaki\\.jp|kanagawa\\.jp|gov\\.au|nm\\.cn|he\\.cn|edu\\.sd|mod\\.om|web\\.ve|edu\\.hk|medecin\\.fr|org\\.cu|info\\.au|edu\\.ve|nx\\.cn|alderney\\.gg|net\\.cu|org\\.za|mb\\.ca|com\\.ye|edu\\.pa|fed\\.us|ac\\.pa|alt\\.na|mil\\.lv|fukuoka\\.jp|gen\\.in|gr\\.jp|gov\\.br|gov\\.ac|id\\.fj|fukui\\.jp|hu\\.com|org\\.gu|net\\.ae|mil\\.ph|ltd\\.je|alt\\.za|gov\\.np|edu\\.jo|net\\.gu|g12\\.br|org\\.tn|store\\.co|fin\\.tn|ac\\.nz|gouv\\.fr|gov\\.il|org\\.ua|org\\.do|org\\.fj|sci\\.eg|gov\\.tt|cci\\.fr|tokyo\\.jp|net\\.lv|gov\\.lc|ind\\.br|ca\\.tt|gos\\.pk|hi\\.cn|net\\.do|co\\.tv|web\\.co|com\\.pa|com\\.ng|ac\\.ma|gov\\.bh|org\\.zw|csiro\\.au|lakas\\.hu|gob\\.ni|gov\\.fk|org\\.sy|gov\\.lb|gov\\.je|ed\\.cr|nb\\.ca|net\\.uy|com\\.ua|media\\.hu|com\\.lb|nom\\.pl|org\\.br|hk\\.cn|co\\.hu|org\\.my|gov\\.dz|sld\\.pa|gob\\.pk|net\\.uk|guernsey\\.gg|nara\\.jp|telememo\\.au|k12\\.tr|org\\.nz|pub\\.sa|edu\\.ac|com\\.dz|edu\\.lv|edu\\.pk|com\\.ph|net\\.na|net\\.et|id\\.lv|au\\.com|ac\\.ng|com\\.my|net\\.cy|unam\\.na|nom\\.za|net\\.np|info\\.pl|priv\\.hu|rec\\.ve|ac\\.uk|edu\\.mm|go\\.ug|ac\\.ug|co\\.dk|net\\.tt|oita\\.jp|fi\\.cr|org\\.ac|aichi\\.jp|org\\.tt|edu\\.bh|us\\.com|ac\\.kr|js\\.cn|edu\\.ni|com\\.mt|fam\\.pk|experts-comptables\\.fr|or\\.kr|org\\.au|web\\.pk|mil\\.jo|biz\\.pl|org\\.np|city\\.hu|org\\.uy|auto\\.pl|aid\\.pl|bib\\.ve|mo\\.cn|br\\.com|dns\\.be|sh\\.cn|org\\.mo|com\\.sg|me\\.uk|gov\\.kw|eun\\.eg|kagoshima\\.jp|ln\\.cn|seoul\\.kr|school\\.fj|com\\.mk|e164\\.arpa|rnu\\.tn|pro\\.ae|org\\.om|gov\\.my|net\\.ye|gov\\.do|co\\.im|org\\.lb|plc\\.co\\.im|net\\.jp|go\\.id|net\\.tw|gov\\.ai|tlf\\.nr|ac\\.im|com\\.do|net\\.py|tozsde\\.hu|com\\.na|tottori\\.jp|net\\.ge|gov\\.cn|org\\.bb|net\\.bs|ac\\.za|rns\\.tn|biz\\.pk|gov\\.ge|org\\.uk|org\\.fk|nhs\\.uk|net\\.bh|tm\\.za|co\\.nz|gov\\.jp|jogasz\\.hu|shop\\.pl|media\\.pl|chiba\\.jp|city\\.za|org\\.ck|net\\.id|com\\.ar|gon\\.pk|gov\\.om|idf\\.il|net\\.cn|prd\\.fr|co\\.in|or\\.ug|red\\.sv|edu\\.lb|k12\\.ec|gx\\.cn|net\\.nz|info\\.hu|ac\\.zw|info\\.tt|com\\.ws|org\\.gg|com\\.et|ac\\.jp|ac\\.at|avocat\\.fr|org\\.ph|sark\\.gg|org\\.ve|tm\\.pl|net\\.pg|gov\\.co|com\\.lc|film\\.hu|ishikawa\\.jp|hotel\\.hu|hl\\.cn|edu\\.ge|com\\.bm|ac\\.om|tec\\.ve|edu\\.tr|cq\\.cn|com\\.pk|firm\\.in|inf\\.br|gunma\\.jp|gov\\.tn|oz\\.au|nf\\.ca|akita\\.jp|net\\.sd|tourism\\.pl|net\\.bb|or\\.at|idv\\.tw|dni\\.us|org\\.mx|conf\\.lv|net\\.jo|nic\\.in|info\\.vn|pe\\.kr|tw\\.cn|org\\.eg|ad\\.jp|hb\\.cn|kyonggi\\.kr|bourse\\.za|org\\.sb|gov\\.gg|net\\.br|mil\\.pe|kobe\\.jp|net\\.sa|edu\\.mt|org\\.vn|yokohama\\.jp|net\\.il|ac\\.cr|edu\\.sb|nagano\\.jp|travel\\.pl|gov\\.tr|com\\.sv|co\\.il|rec\\.br|biz\\.om|com\\.mm|com\\.az|org\\.vu|edu\\.ng|com\\.mx|info\\.co|realestate\\.pl|mil\\.sh|yamagata\\.jp|or\\.id|org\\.ae|greta\\.fr|k12\\.il|com\\.tw|gov\\.ve|arts\\.ve|cul\\.na|gov\\.kh|org\\.bm|etc\\.br|or\\.th|ch\\.vu|de\\.tt|ind\\.je|org\\.tw|nom\\.fr|co\\.tt|net\\.lc|intl\\.tn|shiga\\.jp|pvt\\.ge|gov\\.ua|org\\.pe|net\\.kh|co\\.vi|iwi\\.nz|biz\\.vn|gov\\.ck|edu\\.eg|zj\\.cn|press\\.ma|ac\\.in|eu\\.tt|art\\.do|med\\.ec|bbs\\.tr|gov\\.uk|edu\\.ua|eu\\.com|web\\.do|szex\\.hu|mil\\.kh|gen\\.nz|okinawa\\.jp|mob\\.nr|edu\\.ws|edu\\.sv|xj\\.cn|net\\.ru|dk\\.tt|erotika\\.hu|com\\.sh|cn\\.com|edu\\.pl|com\\.nc|org\\.il|arts\\.co|chirurgiens-dentistes\\.fr|net\\.pa|takamatsu\\.jp|net\\.ng|org\\.hu|net\\.in|net\\.vu|gen\\.tr|shop\\.hu|com\\.ae|tokushima\\.jp|za\\.com|gov\\.eg|co\\.jp|uba\\.ar|net\\.my|biz\\.et|art\\.br|ac\\.fk|gob\\.pe|com\\.bs|co\\.ae|de\\.net|net\\.eg|hyogo\\.jp|edunet\\.tn|museum\\.om|nom\\.ve|rnrt\\.tn|hn\\.cn|com\\.fk|edu\\.dz|ne\\.kr|co\\.je|sch\\.uk|priv\\.pl|sp\\.br|net\\.hk|name\\.vn|com\\.sa|edu\\.bm|qc\\.ca|bolt\\.hu|per\\.kh|sn\\.cn|mil\\.id|kagawa\\.jp|utsunomiya\\.jp|erotica\\.hu|gd\\.cn|net\\.tr|edu\\.np|asn\\.au|com\\.gu|ind\\.tn|mil\\.br|net\\.lb|nom\\.co|org\\.la|mil\\.pl|ac\\.il|gov\\.jo|com\\.kw|edu\\.sh|otc\\.au|gmina\\.pl|per\\.sg|gov\\.mo|int\\.ve|news\\.hu|sec\\.ps|ac\\.pg|health\\.vn|sex\\.pl|net\\.nc|qc\\.com|idv\\.hk|org\\.hk|gok\\.pk|com\\.ac|tochigi\\.jp|gsm\\.pl|law\\.za|pro\\.vn|edu\\.pe|info\\.et|sch\\.gg|com\\.vn|gov\\.bm|com\\.cn|mod\\.uk|gov\\.ps|toyama\\.jp|gv\\.at|yk\\.ca|org\\.et|suli\\.hu|edu\\.my|org\\.mm|co\\.yu|int\\.ar|pe\\.ca|tm\\.hu|net\\.sb|org\\.yu|com\\.ru|com\\.pe|edu\\.kh|edu\\.kw|org\\.qa|med\\.om|net\\.ws|org\\.in|turystyka\\.pl|store\\.ve|org\\.bs|mil\\.uy|net\\.ar|iwate\\.jp|org\\.nc|us\\.tt|gov\\.sh|nom\\.fk|go\\.th|gov\\.ec|com\\.br|edu\\.do|gov\\.ng|pro\\.tt|sapporo\\.jp|net\\.ua|tm\\.fr|com\\.lv|com\\.mo|edu\\.uk|fin\\.ec|edu\\.ps|ru\\.com|edu\\.ec|ac\\.fj|net\\.mm|veterinaire\\.fr|nom\\.re|ingatlan\\.hu|fr\\.vu|ne\\.jp|int\\.co|gov\\.cy|org\\.lv|de\\.com|nagasaki\\.jp|com\\.sb|gov\\.za|org\\.lc|com\\.fj|ind\\.in|or\\.cr|sc\\.cn|chambagri\\.fr|or\\.jp|forum\\.hu|tmp\\.br|reklam\\.hu|gob\\.sv|com\\.pl|saitama\\.jp|name\\.tt|niigata\\.jp|sklep\\.pl|nom\\.ni|co\\.ma|net\\.la|co\\.om|pharmacien\\.fr|port\\.fr|mil\\.gu|au\\.tt|edu\\.gu|ngo\\.ph|com\\.ve|ac\\.th|gov\\.fj|barreau\\.fr|net\\.ac|ac\\.je|org\\.kw|sport\\.hu|ac\\.cn|net\\.bm|ibaraki\\.jp|tel\\.no|org\\.cy|edu\\.mo|gb\\.net|kyoto\\.jp|sch\\.sa|com\\.au|edu\\.lc|fax\\.nr|gov\\.mm|it\\.tt|org\\.jo|nat\\.tn|mil\\.ve|be\\.tt|org\\.az|rec\\.co|co\\.ve|gifu\\.jp|net\\.th|hokkaido\\.jp|ac\\.gg|go\\.kr|edu\\.ye|qh\\.cn|ab\\.ca|org\\.cn|no\\.com|co\\.uk|gov\\.gu|de\\.vu|miasta\\.pl|kawasaki\\.jp|co\\.cr|miyagi\\.jp|org\\.jp|osaka\\.jp|web\\.za|net\\.za|gov\\.pk|gov\\.vn|agrar\\.hu|asn\\.lv|org\\.sv|net\\.sh|org\\.sa|org\\.dz|assedic\\.fr|com\\.sy|net\\.ph|mil\\.ge|es\\.tt|mobile\\.nr|co\\.kr|ltd\\.uk|ac\\.be|fgov\\.be|geek\\.nz|ind\\.gg|net\\.mt|maori\\.nz|ens\\.tn|edu\\.py|gov\\.sd|gov\\.qa|nt\\.ca|com\\.pg|org\\.kh|pc\\.pl|com\\.eg|net\\.ly|se\\.com|gb\\.com|edu\\.ar|sch\\.je|mil\\.ac|mil\\.ar|okayama\\.jp|gov\\.sg|ac\\.id|co\\.id|com\\.ly|huissier-justice\\.fr|nic\\.im|gov\\.lv|nu\\.ca|org\\.sg|com\\.kh|org\\.vi|sa\\.cr|lg\\.jp|ns\\.ca|edu\\.co|gov\\.im|edu\\.om|net\\.dz|org\\.pl|pp\\.ru|tm\\.mt|org\\.ar|co\\.gg|org\\.im|edu\\.qa|org\\.py|edu\\.uy|targi\\.pl|com\\.ge|gub\\.uy|gov\\.ar|ltd\\.gg|fr\\.tt|net\\.qa|com\\.np|ass\\.dz|se\\.tt|com\\.ai|org\\.ma|plo\\.ps|co\\.at|med\\.sa|net\\.sg|kanazawa\\.jp|com\\.fr|school\\.za|net\\.pl|ngo\\.za|net\\.sy|ed\\.jp|org\\.na|net\\.ma|asso\\.fr|police\\.uk|powiat\\.pl|govt\\.nz|sk\\.ca|tj\\.cn|mil\\.ec|com\\.jo|net\\.mo|notaires\\.fr|avoues\\.fr|aeroport\\.fr|yn\\.cn|gov\\.et|gov\\.sa|gov\\.ae|com\\.tt|art\\.dz|firm\\.ve|com\\.sd|school\\.nz|edu\\.et|gob\\.pa|telecom\\.na|ac\\.cy|gz\\.cn|net\\.kw|mobil\\.nr|nic\\.uk|co\\.th|com\\.vu|com\\.re|belgie\\.be|nl\\.ca|uk\\.com|com\\.om|utazas\\.hu|presse\\.fr|co\\.ck|xz\\.cn|org\\.tr|mil\\.co|edu\\.cn|net\\.ec|on\\.ca|konyvelo\\.hu|gop\\.pk|net\\.om|info\\.ve|com\\.ni|sa\\.com|com\\.tr|sch\\.sd|fukushima\\.jp|tel\\.nr|atm\\.pl|kitakyushu\\.jp|com\\.qa|firm\\.co|edu\\.tt|games\\.hu|mil\\.nz|cri\\.nz|net\\.az|org\\.ge|mie\\.jp|net\\.mx|sch\\.ae|nieruchomosci\\.pl|int\\.vn|edu\\.za|com\\.cy|wakayama\\.jp|gov\\.hk|org\\.pa|edu\\.au|gov\\.in|pro\\.om|2000\\.hu|szkola\\.pl|shimane\\.jp|co\\.zw|gove\\.tw|com\\.co|net\\.ck|net\\.pk|net\\.ve|org\\.ru|uk\\.net|org\\.co|uu\\.mt|com\\.cu|mil\\.za|plc\\.uk|lkd\\.co\\.im|gs\\.cn|sex\\.hu|net\\.je|kumamoto\\.jp|mil\\.lb|edu\\.yu|gov\\.ws|sendai\\.jp|eu\\.org|ah\\.cn|net\\.vn|gov\\.sb|net\\.pe|nagoya\\.jp|geometre-expert\\.fr|net\\.fk|biz\\.tt|org\\.sh|edu\\.sa|saga\\.jp|sx\\.cn|org\\.je|org\\.ye|muni\\.il|kochi\\.jp|com\\.bh|org\\.ec|priv\\.at|gov\\.sy|org\\.ni|casino\\.hu|res\\.in|uy\\.com)");
	}
	
}