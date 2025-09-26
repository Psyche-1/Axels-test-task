import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router';
import useNotifications from '../hooks/useNotifications/useNotifications';
import {
  getOne as getOrder,
  updateOne as updateOrder,
  validate as validateOrder,
} from '../data/orders';
import OrderForm from './OrderForm';
import PageContainer from './PageContainer';

function OrderEditForm({ initialValues, onSubmit }) {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const notifications = useNotifications();

  const [formState, setFormState] = React.useState(() => ({
    values: initialValues,
    errors: {},
  }));
  const formValues = formState.values;
  const formErrors = formState.errors;

  const setFormValues = React.useCallback((newFormValues) => {
    setFormState((previousState) => ({
      ...previousState,
      values: newFormValues,
    }));
  }, []);

  const setFormErrors = React.useCallback((newFormErrors) => {
    setFormState((previousState) => ({
      ...previousState,
      errors: newFormErrors,
    }));
  }, []);

  const handleFormFieldChange = React.useCallback(
    (name, value) => {
      const validateField = async (values) => {
        const { issues } = validateOrder(values);
        setFormErrors({
          ...formErrors,
          [name]: issues?.find((issue) => issue.path?.[0] === name)?.message,
        });
      };

      const newFormValues = { ...formValues, [name]: value };

      setFormValues(newFormValues);
      validateField(newFormValues);
    },
    [formValues, formErrors, setFormErrors, setFormValues],
  );

  const handleFormReset = React.useCallback(() => {
    setFormValues(initialValues);
  }, [initialValues, setFormValues]);

  const handleFormSubmit = React.useCallback(async () => {
    const { issues } = validateOrder(formValues);
    if (issues && issues.length > 0) {
      setFormErrors(
        Object.fromEntries(issues.map((issue) => [issue.path?.[0], issue.message])),
      );
      return;
    }
    setFormErrors({});

    try {
      await onSubmit(formValues);
      notifications.show('Order edited successfully.', {
        severity: 'success',
        autoHideDuration: 10000,
      });

      navigate('/orders');
    } catch (editError) {
      notifications.show(`Failed to edit order. Reason: ${editError.message}`, {
        severity: 'error',
        autoHideDuration: 10000,
      });
      throw editError;
    }
  }, [formValues, navigate, notifications, onSubmit, setFormErrors]);

  return (
    <OrderForm
      formState={formState}
      onFieldChange={handleFormFieldChange}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
      submitButtonLabel="Save"
      backButtonPath={`/orders/${orderId}`}
    />
  );
}

OrderEditForm.propTypes = {
  initialValues: PropTypes.shape({
    age: PropTypes.number,
    isBuying: PropTypes.bool,
    joinDate: PropTypes.string,
    name: PropTypes.string,
    client: PropTypes.string,
    status: PropTypes.oneOf(['Development', 'Finance', 'Market', 'Business']),
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function OrderEdit() {
  const { orderId } = useParams();

  const [order, setOrder] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const showData = await getOrder(Number(orderId));

      setOrder(showData);
    } catch (showDataError) {
      setError(showDataError);
    }
    setIsLoading(false);
  }, [orderId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = React.useCallback(
    async (formValues) => {
      const updatedData = await updateOrder(Number(orderId), formValues);
      setOrder(updatedData);
    },
    [orderId],
  );

  const renderEdit = React.useMemo(() => {
    if (isLoading) {
      return (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            m: 1,
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
    if (error) {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      );
    }

    return order ? (
      <OrderEditForm initialValues={order} onSubmit={handleSubmit} />
    ) : null;
  }, [isLoading, error, order, handleSubmit]);

  return (
    <PageContainer
      title={`Edit Order ${orderId}`}
      breadcrumbs={[
        { title: 'Orders', path: '/orders' },
        { title: `Order ${orderId}`, path: `/orders/${orderId}` },
        { title: 'Edit' },
      ]}
    >
      <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box>
    </PageContainer>
  );
}