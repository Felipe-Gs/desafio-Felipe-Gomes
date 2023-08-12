class CaixaDaLanchonete {
   calcularValorDaCompra(formaDePagamento, itens) {
      const cardapio = [
         { codigo: "cafe", descricao: "Café", valor: 3.0 },
         {
            codigo: "chantily",
            descricao: "Chantily (extra do Café)",
            valor: 1.5,
         },
         { codigo: "suco", descricao: "Suco Natural", valor: 6.2 },
         { codigo: "sanduiche", descricao: "Sanduíche", valor: 6.5 },
         {
            codigo: "queijo",
            descricao: "Queijo (extra do Sanduíche)",
            valor: 2.0,
         },
         { codigo: "salgado", descricao: "Salgado", valor: 7.25 },
         { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
         { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
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

            if (itemNoCardapio.codigo.endsWith("_extra")) {
               const itemPrincipalCodigo = itemNoCardapio.codigo.replace(
                  "_extra",
                  ""
               );
               if (!itens.includes(itemPrincipalCodigo)) {
                  return "Item extra não pode ser pedido sem o principal";
               }
               if (
                  !possuiItemPrincipal &&
                  formaDePagamento === "dinheiro" &&
                  itemNoCardapio.codigo
               ) {
                  return "Item extra não pode ser pedido sem o principal";
               }
            }
            total += itemNoCardapio.valor * parseInt(quantidade);
         }

         for (const itemSelecionado of itens) {
            const [codigo] = itemSelecionado.split(",");
            const itemNoCardapio = cardapio.find(
               (item) => item.codigo === codigo
            );

            if (itemNoCardapio && itemNoCardapio.codigo === "cafe") {
               const extraCode = `${itemNoCardapio.codigo}_extra`;
               const extraItem = cardapio.find(
                  (item) => item.codigo === extraCode
               );

               if (extraItem && itens.includes(`${extraCode},${quantidade}`)) {
                  total += extraItem.valor;
               }
            }
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
