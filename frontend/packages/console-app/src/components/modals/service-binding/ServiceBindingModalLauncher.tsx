import * as React from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { createModalLauncher } from '@console/internal/components/factory/modal';
import { history, getQueryArgument } from '@console/internal/components/utils';
import { K8sKind, k8sList, K8sResourceKind } from '@console/internal/module/k8s';
import { ServiceBindingModel } from '@console/topology/src/models';
import { createServiceBinding } from '@console/topology/src/operators/actions/serviceBindings';
import CreateServiceBindingForm, {
  CreateServiceBindingFormProps,
} from './CreateServiceBindingForm';
import { checkExistingServiceBinding } from './service-binding-modal-launcher-utils';
import { serviceBindingValidationSchema } from './servicebinding-validation-utils';

type CreateServiceBindingModalProps = CreateServiceBindingFormProps & {
  model: K8sKind;
  resource: K8sResourceKind;
  close?: () => void;
};

type CreateServiceBindingFormType = {
  name: string;
  bindableService: K8sResourceKind;
};

const CreateServiceBindingModal: React.FC<CreateServiceBindingModalProps> = (props) => {
  const { resource, model } = props;
  const { t } = useTranslation();
  const handleSubmit = async (values, actions) => {
    const bindings: K8sResourceKind[] = await k8sList(ServiceBindingModel, {
      ns: resource.metadata.namespace,
    });
    let existingServiceBinding = {};
    if (bindings.length > 0) {
      existingServiceBinding = checkExistingServiceBinding(
        bindings,
        resource,
        values.bindableService,
        model,
      );
    }
    if (Object.keys(existingServiceBinding ?? {}).length === 0) {
      try {
        await createServiceBinding(resource, values.bindableService, values.name);
        props.close();
        getQueryArgument('view') === null &&
          history.push(`/topology/ns/${resource.metadata.namespace}`);
      } catch (errorMessage) {
        actions.setStatus({ submitError: errorMessage.message });
      }
    } else {
      actions.setStatus({
        submitError: t(
          'console-app~Service binding already exists. Select a different service to connect to.',
        ),
      });
    }
  };

  const initialValues: CreateServiceBindingFormType = {
    name: '',
    bindableService: {},
  };
  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ error: '' }}
      validationSchema={serviceBindingValidationSchema(t)}
      onSubmit={handleSubmit}
    >
      {(formikProps) => <CreateServiceBindingForm {...formikProps} {...props} />}
    </Formik>
  );
};

export const createServiceBindingModal = createModalLauncher(CreateServiceBindingModal);
