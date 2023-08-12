class CaixaDaLanchonete {
   calcularValorDaCompra(formaDePagamento, itens) {
      const cardapio = [
         { codigo: "cafe", descricao: "Café", valor: 3.0, extra: "" },
         {
            codigo: "chantily",
            descricao: "Chantily",
            valor: 1.5,
            extra: "café",
         },
         { codigo: "suco", descricao: "Suco Natural", valor: 6.2, extra: "" },
         { codigo: "sanduiche", descricao: "Sanduíche", valor: 6.5, extra: "" },
         {
            codigo: "queijo",
            descricao: "Queijo",
            valor: 2.0,
            extra: "sanduiche",
         },
         { codigo: "salgado", descricao: "Salgado", valor: 7.25, extra: "" },
         {
            codigo: "combo1",
            descricao: "1 Suco e 1 Sanduíche",
            valor: 9.5,
            extra: "",
         },
         {
            codigo: "combo2",
            descricao: "1 Café e 1 Sanduíche",
            valor: 7.5,
            extra: "",
         },
      ];

      if (itens.length < 1) {
         return "Não há itens no carrinho de compra!";
      } else if (
         formaDePagamento !== "credito" &&
         formaDePagamento !== "debito" &&
         formaDePagamento !== "dinheiro"
      ) {
         return "Forma de pagamento inválida!";
      } else {
         let total = 0;
         let existeExtra = false;
         for (const itemSelecionado of itens) {
            const [codigo, quantidade] = itemSelecionado.split(",");
            const itemNoCardapio = cardapio.find(
               (item) => item.codigo === codigo
            );

            if (!itemNoCardapio) {
               return "Item inválido!";
            }

            if (formaDePagamento === "dinheiro" && quantidade == 0) {
               return "Quantidade inválida!";
            }
            if (itemNoCardapio.extra.length > 0) {
               itens.filter((item) => {
                  const [itens] = item.split(",");

                  if (itens === itemNoCardapio.extra) {
                     existeExtra = true;
                  }
               });
               if (existeExtra === false) {
                  return "Item extra não pode ser pedido sem o principal";
               }
            }
            total += itemNoCardapio.valor * parseInt(quantidade);
         }

         if (formaDePagamento === "credito") {
            const acrescimoCredito = 0.03;
            total *= 1 + acrescimoCredito;
         } else if (formaDePagamento === "dinheiro") {
            const descontoDinheiro = 0.05;
            total *= 1 - descontoDinheiro;
         } else if (formaDePagamento === "debito") {
         }
         const valorFormatado = `R$ ${total.toFixed(2).replace(".", ",")}`;
         return valorFormatado;
      }
   }
}

export { CaixaDaLanchonete };
