import { Injectable } from '@nestjs/common';
import { Role } from '@app/auth/enums/role.enum';

interface IsAuthorizedParams {
  currentRole: Role;
  requiredRole: Role;
}

@Injectable()
export class AccessContorlService {
  private hierarchies: Array<Map<string, number>> = [];
  private priority: number = 1;

  constructor() {
    this.buildRoles([Role.USER, Role.ADMIN]);
  }

  /**
   * La méthode buildRoles permet de créer une hiérarchie de rôles entre un ensemble de rôles spécifié.
   * Les rôles doivent être spécifiés de l'utilisateur le moins privilégié au plus privilégié
   * @param roles Tableau contenant la liste des rôles
   */
  private buildRoles(roles: Role[]) {
    const hierarchy: Map<string, number> = new Map();
    roles.forEach((role) => {
      hierarchy.set(role, this.priority);
      this.priority++;
    });
    this.hierarchies.push(hierarchy);
  }

  public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
    for (let hierarchy of this.hierarchies) {
      const priority = hierarchy.get(currentRole);
      const requiredPriority = hierarchy.get(requiredRole);
      if (priority && requiredPriority && priority >= requiredPriority) {
        return true;
      }
    }
    return false;
  }
}