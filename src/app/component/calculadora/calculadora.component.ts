import { Component } from '@angular/core';
import { Crime } from '../../model/crime';
import { Participante } from '../../model/participante';
import { Relatorio } from '../../model/relatorio';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss'
})
export class CalculadoraComponent {
  imagemColada: File | null = null;
  crimes: Crime[] = [];
  participantes: Participante[] = [];
  crimeNumero: string = '';  // Adicionando a variável crimeNumero
  participante: string = '';  // Adicionando a variável participante
  relatorio: Relatorio = {
    numeroOficial: '',
    nomeOficial: '',
    numeroPassaporte: '',
    totalMesesPrisao: 0,
    crimes: [],
    dataHora: '',
    participantes: []
  };

  adicionarCrime(crimeNumero: string): void {
    if (!crimeNumero || crimeNumero === 'Selecione o número do Art.') {
      alert('Por favor, selecione um crime antes de adicionar.');
      return;
    }

    if (!this.crimes.some(crime => crime.artigo === `Art.${crimeNumero}`)) {
      this.crimes.push({ artigo: `Art.${crimeNumero}` });
      this.gerarRelatorio();
    } else {
      alert('Este crime já foi adicionado.');
    }
  }

  // Função para adicionar participante
  adicionarParticipante(participante: string): void {
    if (!participante || participante === 'Selecione um participante') {
      alert('Por favor, selecione um participante antes de adicionar.');
      return;
    }

    if (!this.participantes.some(p => p.nome === `Oficial.${participante}`)) {
      this.participantes.push({ tipo: 'Oficial', nome: `Oficial.${participante}` });
      this.gerarRelatorio();
    } else {
      alert('Este participante já foi adicionado.');
    }
  }

  // Função para limpar participantes
  limparParticipantes(): void {
    this.participantes = [];
    this.gerarRelatorio();
  }

  // Função para limpar imagem
  limparImagem(): void {
    this.imagemColada = null;
  }

  // Função para calcular o tempo de prisão
  calcularMesesPrisao(): number {
    const mesesPorCrime = {
      'Art.11': 60,
      'Art.12': 5,
      'Art.13': 5,
      'Art.14': 5,
      // Adicionar outros crimes aqui...
    };

    const confessouCrime = false; // To be replaced by actual binding
    const reuPrimario = false; // To be replaced by actual binding
    const reincidenteMesmoCrime = false; // To be replaced by actual binding
    const reincidenteCrimeDiferente = false; // To be replaced by actual binding

    let totalMeses = this.crimes.reduce((total, crime) => {
      if (mesesPorCrime[crime.artigo as keyof typeof mesesPorCrime]) { // Aqui está o tipo correto
        total += mesesPorCrime[crime.artigo as keyof typeof mesesPorCrime];
      }
      return total;
    }, 0);

    if (confessouCrime) {
      totalMeses -= 0.1 * totalMeses;
    }

    if (reuPrimario) {
      totalMeses -= 0.1 * totalMeses;
    }

    if (reincidenteCrimeDiferente) {
      totalMeses += 0.2 * totalMeses;
    }

    return totalMeses;
  }

  // Função para gerar o relatório
  gerarRelatorio(): void {
    const totalMesesPrisao = this.calcularMesesPrisao();
    const dataHoraAtual = new Date();
    this.relatorio = {
      numeroOficial: this.relatorio.numeroOficial,
      nomeOficial: this.relatorio.nomeOficial,
      numeroPassaporte: this.relatorio.numeroPassaporte,
      totalMesesPrisao: Math.floor(totalMesesPrisao),
      crimes: this.crimes.map(crime => crime.artigo),
      dataHora: dataHoraAtual.toLocaleString(),
      participantes: this.participantes.map(p => p.nome)
    };
  }

  // Função para enviar relatório para o Discord
  enviarRelatorioParaDiscord(): void {
    if (this.imagemColada) {
      this.enviarParaDiscord(this.relatorio, this.imagemColada);
    } else {
      alert("Selecione uma imagem antes de enviar.");
    }
  }

  // Função para enviar para o Discord (mock)
  enviarParaDiscord(relatorio: Relatorio, imagem: File | null): void {
    console.log("Enviando relatório para o Discord...");
    console.log(relatorio);
    if (imagem) {
      console.log("Imagem:", imagem.name);
    }
  }
}