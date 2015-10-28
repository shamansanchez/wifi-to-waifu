chrome.storage.sync.get('probability', function(items){
    if (items.probability === undefined) {
        items.probability = 100;
        chrome.storage.sync.set({probability: items.probability});
    }

    walk(document.body, items.probability);
});

function walk(node, probability)
{
    // I stole this function from here:
    // http://is.gd/mwZp7E

    var child, next;

    switch ( node.nodeType )
    {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while ( child )
            {
                next = child.nextSibling;
                walk(child, probability);
                child = next;
            }
            break;

        case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node, probability);
            }
            break;
    }
}

function handleText(textNode, probability)
{
    var v = textNode.nodeValue;
    var val = Math.ceil(100 * Math.random());

    if (val <= probability) {
        v = v.replace(/\bwifi\b/g, "waifu");
        v = v.replace(/\bwi-fi\b/g, "waifu");
        v = v.replace(/\bWi-fi\b/g, "Waifu");
        v = v.replace(/\bWifi\b/g, "Waifu");
        v = v.replace(/\bWiFi\b/g, "Waifu");
        v = v.replace(/\bWi-Fi\b/g, "Waifu");

        textNode.nodeValue = v;
    }
}


