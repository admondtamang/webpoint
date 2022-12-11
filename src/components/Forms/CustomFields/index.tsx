import InputTypes from "@/constants/InputTypes";
import InputField from "../FormComponents/InputField";
import PriceField from "../FormComponents/PriceField";
import TagsInput from "../FormComponents/ReactSelect";
import TextAreaField from "../FormComponents/TextAreaField";

export default function CustomFields({ fields }: any) {
  function handleField(field: any, index: number) {
    switch (field.type) {
      case InputTypes.InputField:
        return (
          <InputField
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            isRequired={field.placeholder}
            key={field.index}
          />
        );
      case InputTypes.TextAreaField:
        return (
          <TextAreaField
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            isRequired={field.placeholder}
            key={field.index}
          />
        );
      case InputTypes.PriceField:
        return (
          <PriceField
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            isRequired={field.placeholder}
            key={field.index}
          />
        );
      case InputTypes.TagsInput:
        return (
          <TagsInput
            key={field.index}
            type="number"
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            tags={[]}
          />
        );
      default:
        return (
          <InputField
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            isRequired={field.placeholder}
            key={field.index}
          />
        );
    }
  }

  return (
    <>{fields.map((field: any, index: number) => handleField(field, index))}</>
  );
}
