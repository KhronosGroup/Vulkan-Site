# VkTensorViewCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorViewCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorViewCreateInfoARM - Structure specifying parameters of a newly created tensor view

The `VkTensorViewCreateInfoARM` structure is defined as:

// Provided by VK_EXT_descriptor_heap, VK_ARM_tensors
typedef struct VkTensorViewCreateInfoARM {
    VkStructureType               sType;
    const void*                   pNext;
    VkTensorViewCreateFlagsARM    flags;
    VkTensorARM                   tensor;
    VkFormat                      format;
} VkTensorViewCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`tensor` is a [VkTensorARM](VkTensorARM.html) on which the view will be created.

* 
`format` is a [VkFormat](VkFormat.html) describing the format and type used to
interpret elements in the tensor.

If `tensor` was created with the
[VK_TENSOR_CREATE_MUTABLE_FORMAT_BIT_ARM](VkTensorCreateFlagBitsARM.html) flag, `format` **can** be
different from the tensor’s format, but if they are not equal they **must** be
*compatible*.
Tensor format compatibility is defined in the
[Format Compatibility Classes](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) section.
Views of compatible formats will have the same mapping between element
locations irrespective of the `format`, with only the interpretation of
the bit pattern changing.

|  | Values intended to be used with one view format **may** not be exactly
| --- | --- |
preserved when written or read through a different format.
For example, an integer value that happens to have the bit pattern of a
floating-point denorm or NaN **may** be flushed or canonicalized when written
or read through a view with a floating-point format.
Similarly, a value written through a signed normalized format that has a bit
pattern exactly equal to -2b **may** be changed to -2b +  1
as described in [Conversion from Normalized Fixed-Point to Floating-Point](../../../../spec/latest/chapters/fundamentals.html#fundamentals-fixedfpconv). |

Valid Usage

* 
[](#VUID-VkTensorViewCreateInfoARM-tensor-09743) VUID-VkTensorViewCreateInfoARM-tensor-09743

If `tensor` was not created with
[VK_TENSOR_CREATE_MUTABLE_FORMAT_BIT_ARM](VkTensorCreateFlagBitsARM.html) flag, `format` **must**
be identical to the `format` used to create `tensor`

* 
[](#VUID-VkTensorViewCreateInfoARM-tensor-09744) VUID-VkTensorViewCreateInfoARM-tensor-09744

If `tensor` was created with
[VK_TENSOR_CREATE_MUTABLE_FORMAT_BIT_ARM](VkTensorCreateFlagBitsARM.html) flag, `format` **must**
be compatible with the `format` used to create `tensor`, as
defined in [Format Compatibility    Classes](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes)

* 
[](#VUID-VkTensorViewCreateInfoARM-flags-09745) VUID-VkTensorViewCreateInfoARM-flags-09745

If `flags` includes
[VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](VkTensorViewCreateFlagBitsARM.html),
the
[`descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay)
feature **must** be enabled

* 
[](#VUID-VkTensorViewCreateInfoARM-pNext-09746) VUID-VkTensorViewCreateInfoARM-pNext-09746

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) structure, `flags`
**must** contain
[VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](VkTensorViewCreateFlagBitsARM.html)

* 
[](#VUID-VkTensorViewCreateInfoARM-usage-09747) VUID-VkTensorViewCreateInfoARM-usage-09747

The `usage` flags of `tensor` **must** have at least one of the
following bits set:

[VK_TENSOR_USAGE_SHADER_BIT_ARM](VkTensorUsageFlagBitsARM.html)

* 
[VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](VkTensorUsageFlagBitsARM.html)

[](#VUID-VkTensorViewCreateInfoARM-usage-09748) VUID-VkTensorViewCreateInfoARM-usage-09748

The tensor view’s [format    features](../../../../spec/latest/chapters/resources.html#resources-tensor-view-format-features) **must** contain the format feature flags required by the
`usage` flags of `tensor` for `format` as indicated in the
[Format Feature Dependent Usage Flags](../../../../spec/latest/chapters/formats.html#format-feature-dependent-usage-flags) section

[](#VUID-VkTensorViewCreateInfoARM-tensor-09749) VUID-VkTensorViewCreateInfoARM-tensor-09749

If `tensor` is non-sparse then it **must** be bound completely and
contiguously to a single [VkDeviceMemory](VkDeviceMemory.html) object

Valid Usage (Implicit)

* 
[](#VUID-VkTensorViewCreateInfoARM-sType-sType) VUID-VkTensorViewCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_VIEW_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkTensorViewCreateInfoARM-pNext-pNext) VUID-VkTensorViewCreateInfoARM-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html)

* 
[](#VUID-VkTensorViewCreateInfoARM-sType-unique) VUID-VkTensorViewCreateInfoARM-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkTensorViewCreateInfoARM-flags-parameter) VUID-VkTensorViewCreateInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkTensorViewCreateFlagBitsARM](VkTensorViewCreateFlagBitsARM.html) values

* 
[](#VUID-VkTensorViewCreateInfoARM-tensor-parameter) VUID-VkTensorViewCreateInfoARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](VkTensorARM.html) handle

* 
[](#VUID-VkTensorViewCreateInfoARM-format-parameter) VUID-VkTensorViewCreateInfoARM-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkFormat](VkFormat.html), [VkResourceDescriptorDataEXT](VkResourceDescriptorDataEXT.html), [VkStructureType](VkStructureType.html), [VkTensorARM](VkTensorARM.html), [VkTensorViewCreateFlagsARM](VkTensorViewCreateFlagsARM.html), [vkCreateTensorViewARM](vkCreateTensorViewARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorViewCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
