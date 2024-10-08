export class TokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenError'; // Nombre específico para este error
  }
}

export class TokenInvalid extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenInvalid'; // Nombre específico para este error
  }
}

export class TokenExpirado extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenExpirado'; // Nombre específico para este error
  }
}
