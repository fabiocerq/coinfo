const xlsx = require('xlsx');
const wb = xlsx.readFile('../../Documents/convert_polo/orca5.xlsx');
let ws = wb.Sheets['orca'];
const rlSync = require('readline-sync');
/* const utf8 = require('utf8'); */

/* INPUT PARA NOME DA PLANILHA */

/* EXCLUSÃO DO CABEÇALHO E RODAPÉ*/
function ec(r, c) {
    return xlsx.utils.encode_cell({ r: r, c: c })
};

function delete_row(ws, row_index) {
    let range = xlsx.utils.decode_range(ws['!ref'])
    for (var R = row_index; R <= range.e.r; ++R) {
        for (var C = range.s.c; C <= range.e.c; ++C) {
            ws[ec(R, C)] = ws[ec(R + 1, C)]
        }
    }

    range.e.r--
    ws['!ref'] = xlsx.utils.encode_range(range.s, range.e)
}

delete_row(ws, i);


/* xlsx.writeFile(wb, 'Polo.xlsx'); */

var data = xlsx.utils.sheet_to_json(ws, { defval: "" });

/* ARREDONDAMENTO */ 
const round = (num, places) => {
    if (!("" + num).includes("e")) {
        return +(Math.round(num + "e+" + places) + "e-" + places);
    } else {
        let arr = ("" + num).split("e");
        let sig = "";
        if (+arr[1] + places > 0) {
            sig = "+"
        }

        return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
    }
}

/* FORMATAÇÃO FINAL DA PLANILHA */
/* INSERINDO NÚMERO E NOME DE  GRUPOS */
var numGrupos = rlSync.question("Insira o numero de grupos da planilha: ");
let nomeGrupos = [numGrupos];

function formatPlan(answer) {
    while (isNaN(numGrupos) != false) {
        numGrupos = rlSync.question("Numero Invalido. Insira o numero de grupos da planilha: ");
    }

    for (let i = 0; i < numGrupos; i++) {
        nomeGrupos[i] = rlSync.question(`Insira o nome do grupo ${i + 1}: `);

        while (isNaN(nomeGrupos) != true) {
            nomeGrupos[i] = rlSync.question(`Nome invalido. Insira o nome do grupo ${i + 1}: `);
        };
    }

    return answer;
}

data = formatPlan(data);

let newData = data.map(function (servico) {
    /* ARREDONDAMENTO DAS COLUNAS DE VALOR UNITÁRIO E TOTAL */
    if (servico.I != 0) {
        servico.I = round(servico.I, 2);
    }

    if (servico.J != 0) {
        servico.J = round(servico.J, 2);
    }

    /* EXCLUSÃO DE COLUNAS */
    delete servico.B;
    delete servico.C;
    delete servico.G;
    delete servico.H;
    delete servico.K;
    delete servico.L;

    /* FORMATAÇÃO DE INDICADORES */
    for (let i = 0; i < numGrupos; i++) {
        if (servico.D == nomeGrupos[i]) {
            servico.A = 'G';
        }
    }

    if (servico.F == 0 && servico.A != 'G') {
        servico.A = 'S';
    };

    if (servico.F != 0) {
        servico.A = '';
        servico.G = 'INCC-FGV';
    };

    return servico
})


/* REMONTAGEM DA PLANILHA */
const newWB = xlsx.utils.book_new();
const newWS = xlsx.utils.json_to_sheet(newData);
xlsx.utils.book_append_sheet(newWB, newWS, "Planilha2");

xlsx.writeFile(newWB, 'Polo.xlsx');

