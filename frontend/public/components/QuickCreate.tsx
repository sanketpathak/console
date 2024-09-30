import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleElement,
  Tooltip,
} from '@patternfly/react-core';
import { history } from '@console/internal/components/utils';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { ALL_NAMESPACES_KEY, formatNamespacedRouteForResource, useFlag } from '@console/shared/src';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FLAGS } from '@console/shared/src/constants';
import { useAccessReview } from '@console/dynamic-plugin-sdk/src';
import { useNavigate } from 'react-router-dom-v5-compat';

type QuickCreateProps = {
  namespace?: string;
};

const getImportFromGitURL = (namespace: string) =>
  namespace === ALL_NAMESPACES_KEY ? '/import/ns/default' : `/import/ns/${namespace}`;
const getContainerImageURL = (namespace: string) =>
  namespace === ALL_NAMESPACES_KEY ? '/deploy-image/ns/default' : `/deploy-image/ns/${namespace}`;

const useCanCreateResource = () => {
  const canCreateBuildConfig = useAccessReview({
    group: 'build.openshift.io',
    resource: 'buildconfigs',
    verb: 'create',
  });
  const canCreateImageStream = useAccessReview({
    group: 'image.openshift.io',
    resource: 'imagestreams',
    verb: 'create',
  });
  const canCreateDeploymentConfig = useAccessReview({
    group: 'apps.openshift.io',
    resource: 'deploymentconfigs',
    verb: 'create',
  });
  const canCreateImageStreamImport = useAccessReview({
    group: 'image.openshift.io',
    resource: 'imagestreamimports',
    verb: 'create',
  });
  const canCreateSecret = useAccessReview({ group: '', resource: 'secrets', verb: 'create' });
  const canCreateRoute = useAccessReview({
    group: 'route.openshift.io',
    resource: 'routes',
    verb: 'create',
  });
  const canCreateService = useAccessReview({ group: '', resource: 'services', verb: 'create' });

  return (
    canCreateBuildConfig &&
    canCreateImageStream &&
    canCreateDeploymentConfig &&
    canCreateImageStreamImport &&
    canCreateSecret &&
    canCreateRoute &&
    canCreateService
  );
};

const QuickCreate: React.FC<QuickCreateProps> = ({ namespace }) => {
  const { t } = useTranslation();
  const opeshiftStartGuideEnable = useFlag(FLAGS.SHOW_OPENSHIFT_START_GUIDE);

  const canCreate = useCanCreateResource();
  const [isOpen, setIsOpen] = React.useState(false);
  const importYAMLURL = formatNamespacedRouteForResource('import', namespace);

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = () => {
    setIsOpen(false);
  };
  return !opeshiftStartGuideEnable ? (
    <Dropdown
      isOpen={isOpen}
      onSelect={onSelect}
      onOpenChange={(open: boolean) => setIsOpen(open)}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          aria-label="kebab dropdown toggle"
          variant="plain"
          onClick={onToggleClick}
          isExpanded={isOpen}
        >
          <Tooltip content={t('public~Quick create')}>
            <PlusCircleIcon className="co-masthead-icon" alt="" />
          </Tooltip>
        </MenuToggle>
      )}
      shouldFocusToggleOnSelect
    >
      <DropdownList>
        <DropdownItem
          value={0}
          key="Import YAML"
          to={importYAMLURL}
          onClick={(ev: any) => {
            ev.preventDefault();
            history.push(importYAMLURL);
          }}
          tooltipProps={{
            content: t('public~Create resources from their YAML or JSON definitions'),
            position: 'left',
          }}
        >
          {t('public~Import YAML')}
        </DropdownItem>
        {canCreate && (
          <>
            <DropdownItem
              value={1}
              key="Import from Git"
              to={getImportFromGitURL(namespace)}
              onClick={(ev: any) => {
                ev.preventDefault();
                history.push(getImportFromGitURL(namespace));
              }}
              tooltipProps={{
                content: t('public~Import code from your Git repository to be built and deployed'),
                position: 'left',
              }}
            >
              {t('public~Import from Git')}
            </DropdownItem>
            <DropdownItem
              value={2}
              key="Container images"
              to={getContainerImageURL(namespace)}
              onClick={(ev: any) => {
                ev.preventDefault();
                history.push(getContainerImageURL(namespace));
              }}
              tooltipProps={{
                content: t(
                  'public~Deploy an existing Image from an Image registry or Image stream tag',
                ),
                position: 'left',
              }}
            >
              {t('public~Container images')}
            </DropdownItem>
          </>
        )}
      </DropdownList>
    </Dropdown>
  ) : null;
};

export default QuickCreate;

export const MobileQuickCreate = ({ namespace, className }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const opeshiftStartGuideEnable = useFlag(FLAGS.SHOW_OPENSHIFT_START_GUIDE);

  const canCreate = useCanCreateResource();
  return !opeshiftStartGuideEnable ? (
    <ul className="pf-v5-c-menu__list">
      <li className="pf-v5-c-menu__list-item">
        <button
          type="button"
          onClick={() => navigate(formatNamespacedRouteForResource('import', namespace))}
          className={className}
        >
          {t('public~Import YAML')}
        </button>
      </li>
      {canCreate && (
        <>
          <li className="pf-v5-c-menu__list-item">
            <button
              type="button"
              onClick={() => navigate(getImportFromGitURL(namespace))}
              className={className}
            >
              {t('public~Import from Git')}
            </button>
          </li>
          <li className="pf-v5-c-menu__list-item">
            <button
              type="button"
              onClick={() => navigate(getContainerImageURL(namespace))}
              className={className}
            >
              {t('public~Container images')}
            </button>
          </li>
        </>
      )}
    </ul>
  ) : null;
};
