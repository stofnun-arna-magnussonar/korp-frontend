settings.corpora = {};
settings.corporafolders = {};

settings.globalFilterCorpora = ["ivip"];

settings.hitsPerPageDefault = 25;
settings.hitsPerPageValues = [10,25,50,75,100,500,1000];
settings.contextValues = {
    5:"5 words",
    7:"7 words",
    10:"10 words",
    15:"15 words",
    20:"20 words"
};
settings.contextDefault = settings.contextValues[7];

settings.inputCaseInsensitiveDefault = true;

settings.corporafolders.frettir = {
    title: "Fréttamiðlar",
    contents: ["frettatiminn", "eyjan"],
    description: "Textar frá ýmsum fréttamiðlum á landsvísu"
};
settings.corporafolders.frettir.ljosvakamidlar = {
    title: "Ljósvakamiðlar",
    contents: ["stod2", "ras1_og_2", "bylgjan", "sjonvarpid", ],
};
settings.corporafolders.frettir.prentmidlar = {
    title: "Prentmiðlar",
    contents: ["morgunbladid"]
};
settings.corporafolders.frettir.vefmidlar = {
    title: "Vefmiðlar",
    contents: ["ruv", "visir", "mbl", "dv_is", "kjarninn", "stundin"]
};
settings.corporafolders.stjornsysla = {
    title: "Stjórnsýsla",
    contents: ["domstolar", "haestirettur", "althingislog", "althingi"],
    description: "Textar gefnir út af stjórnvöldum Íslands"
};
settings.corporafolders.fraedslumidlar = {
    title: "Fræðslumiðlar",
    contents: ["wikipedia", "visindavefur"],
    description: "Textar af fræðslumiðlum og úr kennsluefni"
};
settings.corporafolders.skodanir = {
    title: "Skoðanir",
    contents: ["silfuregils", "andriki", "jonas"],
    description: "Blogg, pistlar og þess háttar"
};
settings.corporafolders.serefni = {
    title: "Sérefni",
    contents: ["bondi", "bleikt", "bbl", "pressan"],
    description: "Ýmsir miðlar um afmörkuð málefni"
};
settings.corporafolders.serefni.timarit = {
    title: "Tímarit",
    contents: ["heimur"],
    description: ""
};
settings.corporafolders.serefni.stadbundid = {
    title: "Bæjarblöð og staðbundnir miðlar",
    contents: ["vf", "fjardarpostur", "dfs", "skessuhorn", "bb"],
    description: "Dagblöð, vefmiðlar og tímarit bæjarfélaga og landshluta"
};
settings.corporafolders.serefni.ithrottir = {
    title: "Íþróttafréttamiðlar",
    contents: ["fotbolti", "fjorirthrirthrir"],
    description: "Textar frá íþróttafréttamiðlum"
};
////////////////////////////////////////

settings.corpora.kjarninn = {
    id: "kjarninn",
    title: "Kjarninn.is",
    description: "Greinar frá fréttamiðlinum Kjarninn.is.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
};
settings.corpora.visir = {
    id: "visir",
    title: "Vísir.is",
    description: "Greinar frá fréttamiðlinum Vísir.is.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
};
settings.corpora.ruv = {
    id: "ruv",
    title: "Rúv.is",
    description: "Fréttir af vefútgáfu fréttastofu Ríkisútvarpsins.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
};
settings.corpora.dfs = {
    id: "dfs",
    title: "Fréttavefur suðurlands",
    description: "Fréttir af fréttavef Suðurlands.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.sjonvarpid = {
    id: "sjonvarpid",
    title: "Sjónvarpsfréttir Rúv",
    description: "Fréttatextar úr sjónvarpsfréttum frá fréttastofu Ríkisútvarpsins.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrsNoUrl,
    customAttributes: {
        article: icelandicCustomAttrs.article_nourl
    }
}
settings.corpora.stod2 = {
    id: "stod2",
    title: "Sjónvarpsfréttir Stöðvar 2",
    description: "Fréttatextar úr sjónvarpsfréttum frá fréttastofu Stöðvar 2.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrsNoUrl,
    customAttributes: {
        article: icelandicCustomAttrs.article_nourl
    }
}
settings.corpora.mbl = {
    id: "mbl",
    title: "Mbl.is",
    description: "Fréttir af vefútgáfu Morgunblaðins.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.dv_is = {
    id: "dv_is",
    title: "DV.is",
    description: "Fréttir af vefútgáfu DV.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrsNoUrl,
    customAttributes: {
        article: icelandicCustomAttrs.article_nourl
    }
}
settings.corpora.morgunbladid = {
    id: "morgunbladid",
    title: "Morgunblaðið",
    description: "Fréttir úr greinasafni Morgunblaðins.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrsNoUrl,
    customAttributes: {
        article: icelandicCustomAttrs.article_nourl
    }
}
settings.corpora.bylgjan = {
    id: "bylgjan",
    title: "Bylgjan",
    description: "Textar frá útvarpsstöðinni Bylgjunni.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrsNoUrl,
    customAttributes: {
        article: icelandicCustomAttrs.article_nourl
    }
}
settings.corpora.ras1_og_2 = {
    id: "ras1_og_2",
    title: "Rás 1 og 2",
    description: "Textar frá útvarpsstöðvunum Rás 1 og Rás 2.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrsNoUrl,
    customAttributes: {
        article: icelandicCustomAttrs.article_nourl
    }
}

settings.corpora.bbl = {
    id: "bbl",
    title: "Bændablaðið",
    description: "Fréttir af vefsíðu Bændablaðsins.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.stundin = {
    id: "stundin",
    title: "Stundin",
    description: "Fréttir af vefútgáfu Stundarinnar.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.frettatiminn = {
    id: "frettatiminn",
    title: "Fréttatíminn",
    description: "Fréttatextar frá Fréttatímanum.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrsNoUrl,
    customAttributes: {
        article: icelandicCustomAttrs.article_nourl
    }
}

////////////////////////////////////////

settings.corpora.vf = {
    id: "vf",
    title: "Víkurfréttir",
    description: "Fréttir af vefsíðu Víkurfrétta.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.bb = {
    id: "bb",
    title: "Bæjarins besta",
    description: "Textar fengnir af vefsíðu vikublaðsins Bæjarins besta.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.fjardarpostur = {
    id: "fjardarpostur",
    title: "Fjarðarpósturinn",
    description: "Textar fengnir af vefsíðu Fjarðarpóstsins, bæjarblaðs Hafnfirðinga.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.skessuhorn = {
    id: "skessuhorn",
    title: "Skessuhorn",
    description: "Textar fengnir af vefsíðunni skessuhorn.is.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}

////////////////////////////////////////


settings.corpora.fjorirthrirthrir = {
    id: "fjorirthrirthrir",
    title: "433.pressan.is",
    description: "Textar af fótboltafréttasíðunni 433.pressan.is.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.fotbolti = {
    id: "fotbolti",
    title: "Fótbolti.net",
    description: "Greinar af vefsíðunni fotbolti.net.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}

////////////////////////////////////////


settings.corpora.jonas = {
    id: "jonas",
    title: "Jónas.is",
    description: "Pistlar af vefsíðu bloggarans Jónasar Kristjánssonar.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.andriki = {
    id: "andriki",
    title: "Andriki.is",
    description: "Greinar af vefsíðunni Andriki.is.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}

////////////////////////////////////////


settings.corpora.bleikt = {
    id: "bleikt",
    title: "Bleikt.is",
    description: "Greinar af vefsíðunni Bleikt.is.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.bondi = {
    id: "bondi",
    title: "Bóndi.is",
    description: "Greinar af vefsíðunni Bondi.is.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.domstolar = {
    id: "domstolar",
    title: "Dómstólar",
    description: "Dómar úr gagnagrunni dómstóla Íslands.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.haestirettur = {
    id: "haestirettur",
    title: "Hæstiréttur",
    description: "Textar af vefsíðu Hæstaréttar.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.althingislog = {
    id: "althingislog",
    title: "Lög",
    description: "Lög Íslands.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.althingi = {
    id: "althingi",
    title: "Alþingisræður",
    description: "Allar ræður sem fluttar hafa verið á Alþingi.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicAlthingiSAttrs,
    customAttributes: {
        article: icelandicCustomAttrs.article_althingi,
        thingmadur: icelandicCustomAttrs.thingmadur
    }
}
settings.corpora.eyjan = {
    id: "eyjan",
    title: "Eyjan",
    description: "Textar fengnir af vefmiðlinum eyjan.is.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.wikipedia = {
    id: "wikipedia",
    title: "Wikipedia",
    description: "Greinar frá íslenskri útgáfu vefalfræðiorðabókarinnar Wikipedia.org.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSAttrsNoDate,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.visindavefur = {
    id: "visindavefur",
    title: "Vísindavefurinn",
    description: "Greinar af vísindavefnum.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.heimur = {
    id: "heimur",
    title: "Heimur",
    description: "Pistlar af vefsíðu útáfyrirtækisins Heims, heimur.is",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrsNoUrl,
    customAttributes: {
        article: icelandicCustomAttrs.article_nourl
    }
}
settings.corpora.silfuregils = {
    id: "silfuregils",
    title: "Silfur Egils",
    description: "Textar frá bloggi Egils Helgasonar",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}
settings.corpora.pressan = {
    id: "pressan",
    title: "Pressan",
    description: "Textar frá miðlum Vefpressunnar, pressan.is",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article
    }
}

settings.corpora.textasafn = {
    id: "textasafn",
    title: "Útgefnar bækur",
    description: "Samansafn texta eftir ýmsa höfunda.",
    context: defaultContext,
    within: {
        "sentence": "sentence",
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: textasafnSattrs,
    customAttributes: {
        article: icelandicCustomAttrs.article_nourl
    }
}
/*
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
settings.preselectedCorpora = [];


settings.corpusListing = new CorpusListing(settings.corpora);
