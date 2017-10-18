settings.corpora = {};
settings.corporafolders = {};

settings.globalFilterCorpora = ["ivip"]

settings.corporafolders.sweac = {
    title: "Test",
    contents: ["testcorpus"],
    description: "A description"
};

settings.corpora["testcorpus"] = {
    id: "testcorpus",
    title: "The Korp Test Corpus",
    description: "A test corpus for testing Korp.",
    within: {"sentence": "sentence"},
    attributes: {
        pos: {
            label: "pos",
            opts: {
                "is": "=",
                "is_not": "!="
            }
        }
    },
    structAttributes: {
    }
}
settings.corpora["lemmadtest"] = {
    id: "lemmadtest",
    title: "Prufa fyrir lemmaðan texta á íslensku",
    description: "Prufa til að prófa Korp.",
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph"
    },
    attributes: {
        pos: {
            label: "pos"
        },
        lemma: {
            label: "lemma"
        }
    },
    structAttributes: {
    }
}
settings.corpora["kjarninn"] = {
    id: "kjarninn",
    title: "Kjarninn.is",
    description: "Greinar frá fréttamiðlinum Kjarninn.is.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["jonas"] = {
    id: "jonas",
    title: "Jónas.is",
    description: "Pistlar af vefsíðu bloggarans Jónasar Kristjánssonar.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
/*
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
settings.preselectedCorpora = ["kjarninn","jonas"];

//
// settings.corpora["magmakolumner"] = {
//     id: "magmakolumner",
//     title: "Magma kolumner 2009–2012",
//     description: "Material ur kolumner publicerade av <a target=\"_blank\" href=\"http://www.magma.fi\">Tankesmedjan Magma</a>",
//     within: spWithin,
//     context: spContext,
//     attributes: modernAttrs,
//     structAttributes: {
//         text_author: {label: "author"},
//         text_title: {label: "title"},
//         text_date: {label: "date"}
//     }
// };

settings.corpusListing = new CorpusListing(settings.corpora);
