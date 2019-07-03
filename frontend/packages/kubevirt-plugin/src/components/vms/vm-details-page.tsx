import * as React from 'react';

import { navFactory } from '@console/internal/components/utils';

import { ResourceEventStream } from '@console/internal/components/events';
import { DetailsPage } from '@console/internal/components/factory';
import { K8sResourceKindReference } from '@console/internal/module/k8s';

import { VMDetailsFirehose } from './vm-details';
import { VMDisksFirehose } from '../vm-disks';
import { VMNics } from '../vm-nics';

// import { VmEvents } from './vm-events';
// import VmConsolesConnected from '../vmconsoles';
// import { menuActions } from './menu-actions';

export const VirtualMachinesDetailsPage = (props: VirtualMachinesDetailsPageProps) => {
  /* TODO(mlibra): pages will be transferred one by one in follow-ups
  const consolePage = {
    href: 'consoles',
    name: 'Consoles',
    component: VmConsolesConnected,
  };
  */

  const nicsPage = {
    href: 'nics',
    name: 'Network Interfaces',
    component: VMNics,
  };

  const disksPage = {
    href: 'disks',
    name: 'Disks',
    component: VMDisksFirehose,
  };

  const pages = [
    navFactory.details(VMDetailsFirehose),
    navFactory.editYaml(),
    // consolePage,
    navFactory.events(ResourceEventStream),
    nicsPage,
    disksPage,
  ];

  const menuActions = undefined; // TODO(mlibra): menuActions

  return <DetailsPage {...props} menuActions={menuActions} pages={pages} />;
};

type VirtualMachinesDetailsPageProps = {
  name: string;
  namespace: string;
  kind: K8sResourceKindReference;
  match: any;
};
