# Tensor Operations

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/VK_ARM_tensors/tensorops.html

## Table of Contents

- [Tensor Operations Overview](#_tensor_operations_overview)
- [Tensor_Operations_Overview](#_tensor_operations_overview)
- [Tensor Coordinate System](#_tensor_coordinate_system)
- [Tensor_Coordinate_System](#_tensor_coordinate_system)
- [Tensor Element Input Operations](#_tensor_element_input_operations)
- [Tensor_Element_Input_Operations](#_tensor_element_input_operations)
- [Tensor Element Input Validation Operations](#tensors-input-validation)
- [Tensor_Element_Input_Validation_Operations](#tensors-input-validation)
- [Instruction/Tensor View Validation](#tensors-operation-validation)
- [Instruction/Tensor_View_Validation](#tensors-operation-validation)
- [Tensor Element Coordinate Validation](#tensors-coordinate-validation)
- [Tensor_Element_Coordinate_Validation](#tensors-coordinate-validation)
- [Format Conversion](#tensors-input-format-conversion)
- [Tensor Element Replacement](#tensors-element-replacement)
- [Tensor_Element_Replacement](#tensors-element-replacement)
- [Tensor Element Output Operations](#_tensor_element_output_operations)
- [Tensor_Element_Output_Operations](#_tensor_element_output_operations)
- [Tensor Element Output Validation Operations](#tensors-output-validation)
- [Tensor_Element_Output_Validation_Operations](#tensors-output-validation)
- [Tensor Element Format Validation](#tensors-format-validation)
- [Tensor_Element_Format_Validation](#tensors-format-validation)
- [Tensor Element Coordinate Validation](#tensors-output-coordinate-validation)
- [Tensor_Element_Coordinate_Validation](#tensors-output-coordinate-validation)
- [Tensor Element Output Format Conversion](#tensors-output-format-conversion)
- [Tensor_Element_Output_Format_Conversion](#tensors-output-format-conversion)
- [Tensor Query Instructions](#tensors-queries)
- [Tensor_Query_Instructions](#tensors-queries)

## Content

Vulkan Tensor Operations are operations performed by those SPIR-V Tensor
Instructions which take an `OpTypeTensorARM` (representing a
`VkTensorViewARM`).
Read and write operations take tensor element coordinates as operands, and
return elements from the tensor.
Query operations return properties of the bound tensor.

Tensor Operations include the functionality of the following SPIR-V Tensor
Instructions:

* 
`OpTensorReadARM` reads one or more elements from the tensor.

* 
`OpTensorWriteARM` writes one or more elements to the tensor.

* 
`OpTensorQuerySizeARM` returns the size of the tensor descriptor that
would be accessed.
The tensor itself is not accessed.

Each elements in a tensor can be addressed using a set of N integer
coordinates where N is equal to the rank, i.e. number of dimensions,
of the tensor.

*Tensor element input instructions* are SPIR-V tensor instructions that read
from a tensor.
*Tensor element input operations* are a set of steps that are performed on
state, coordinates, and tensor element values while processing a tensor
element input instruction, and which are common to some or all tensor
element input instructions.
They include the following steps, which are performed in the listed order:

* 
[Validation operations](#tensors-input-validation)

[Instruction/Tensor validation](#tensors-operation-validation)

* 
[Coordinate validation](#tensors-coordinate-validation)

[Format conversion](#tensors-input-format-conversion)

[Tensor Element replacement](#tensors-element-replacement)

For tensor element input instructions involving multiple tensor elements,
these steps are applied for each tensor element that is used in the
instruction.

Tensor element input validation operations inspect instruction/tensor state
or coordinates, and in certain circumstances cause the tensor element value
to be replaced or become **undefined**.
There are a series of validations that the tensor element undergoes.

There are a number of cases where a SPIR-V instruction **can** mismatch with
the tensor view.
In such cases the value of the tensor element returned is poison.

These cases include:

* 
The SPIR-V instruction’s tensor variable’s properties are not compatible
with the tensor view:

The SPIR-V Tensor `Element` `Type` is not
[compatible](../../appendices/spirvenv.html#spirvenv-tensor-formats) with the tensor view’s
`format`.

* 
The SPIR-V Tensor `Rank` is not present.

* 
The SPIR-V Tensor `Rank` is not the same as the value provided for
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`dimensionCount` when creating the
tensor used by the tensor view.

* 
The SPIR-V Tensor `Shape`, if present, does not match the set of
values provided for [VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`pDimensions`
when creating the tensor used by the tensor view.

Tensor element coordinates are validated against the size of the tensor.

If the tensor element coordinates do not satisfy all of the conditions

0 ≤ Coordinates[i]  for 0 ≤ i 

where:

Size[i] is the size of the tensor along dimension i
as provided via
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`pDimensions`[i] when the
tensor was created.

dimensionCount is the number of dimensions of the tensor
as provided via
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`dimensionCount` when the
tensor was created.

, or the tensor descriptor is a null descriptor,

then the tensor element fails coordinate validation.

There are two cases to consider:

Valid Tensor Element Coordinates

* 
If the tensor element coordinates pass validation (that is, the
coordinates lie within the tensor),

then the tensor element value comes from the value in tensor memory.

Out-of-Bounds Tensor Element

* 
If the tensor element coordinates fail validation,

then the tensor element is an invalid tensor element and
[tensor element replacement](#tensors-element-replacement) is performed.

If required, tensor elements undergo a format conversion from the
[VkFormat](../formats.html#VkFormat) of the tensor view to the element type of the tensor resource
variable on which a read operation is performed.

Each element is converted based on its type and size (as defined in the
[Format Definition](../formats.html#formats-definition) section for each [VkFormat](../formats.html#VkFormat)),
using the appropriate equations in [16-Bit Floating-Point Numbers](../fundamentals.html#fundamentals-fp16), [Unsigned 11-Bit Floating-Point Numbers](../fundamentals.html#fundamentals-fp11),
[Unsigned 10-Bit Floating-Point Numbers](../fundamentals.html#fundamentals-fp10),
[Fixed-Point Data Conversion](../fundamentals.html#fundamentals-fixedconv), and
[8-bit booleans](../fundamentals.html#fundamentals-bool).

The compatibility between SPIR-V tensor element types and [VkFormat](../formats.html#VkFormat) is
specified under [Compatibility Between SPIR-V Tensor Element Types And Vulkan Formats](../../appendices/spirvenv.html#spirvenv-tensor-formats).

A tensor element is replaced if it is an invalid tensor element.

Invalid tensor elements are replaced as follows:

* 
If the `OpTensorReadARM` instruction that caused an invalid tensor
element to be accessed did not have a `OutOfBoundsValueARM` tensor
operand present, then the value returned is the same as that produced by
`OpConstantNull` for the type returned.

* 
If the `OpTensorReadARM` instruction that caused an invalid tensor
element to be accessed had a `OutOfBoundsValueARM` tensor operand
present, then the value provided using `OutOfBoundsValueARM` is
returned.

*Tensor element output instructions* are SPIR-V tensor instructions that
write to a tensor.
*Tensor element output operations* are a set of steps that are performed on
state, coordinates, and tensor element values while processing a tensor
element output instruction, and which are common to some or all tensor
element output instructions.
They include the following steps, which are performed in the listed order:

* 
[Validation operations](#tensors-output-validation)

[Format validation](#tensors-format-validation)

* 
[Coordinate validation](#tensors-output-coordinate-validation)

[Tensor element output format    conversion](#tensors-output-format-conversion)

*Tensor element output validation operations* inspect instruction/tensor
state or coordinates, and in certain circumstances cause the write to have
no effect.
There are a series of validations that the tensor element undergoes.

If one of the following conditions is met, then an operation writing to the
tensor causes the tensor’s memory to become **undefined** .

* 
The SPIR-V instruction’s tensor variable’s properties are not compatible
with the tensor view:

The SPIR-V Tensor Element Type is not
[compatible](../../appendices/spirvenv.html#spirvenv-tensor-formats) with the tensor view’s
`format`.

* 
The SPIR-V Tensor Rank is not present.

* 
The SPIR-V Tensor Rank is not the same as the value provided for
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`dimensionCount` when creating the
tensor used by the tensor view.

* 
The SPIR-V Tensor Shape, if present, does not match the set of values
provided for [VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`pDimensions` when
creating the tensor used by the tensor view.

The tensor element coordinates are validated according to the same rules as
for tensor element input [coordinate validation](#tensors-coordinate-validation).

If the tensor element fails coordinate validation, then the write has no
effect.

If required, tensor elements undergo a format conversion from the element
type of the tensor resource variable on which a write operation is performed
to the [VkFormat](../formats.html#VkFormat) of the tensor view.

Each element is converted based on its type and size (as defined in the
[Format Definition](../formats.html#formats-definition) section for each [VkFormat](../formats.html#VkFormat)).
Floating-point outputs are converted as described in
[Floating-Point Format Conversions](../fundamentals.html#fundamentals-fp-conversion) and
[Fixed-Point Data Conversion](../fundamentals.html#fundamentals-fixedconv).
Boolean outputs are converted as described in [8-bit boolean](../fundamentals.html#fundamentals-bool).
Integer outputs are converted such that their value is preserved.

The compatibility between SPIR-V tensor element types and [VkFormat](../formats.html#VkFormat) is
specified under [Compatibility Between SPIR-V Tensor Element Types And Vulkan Formats](../../appendices/spirvenv.html#spirvenv-tensor-formats).

`OpTensorQuerySizeARM` queries the size of a tensor whose descriptor
would be accessed by a shader tensor operation.

It always returns 0 if the bound descriptor is a null descriptor.
