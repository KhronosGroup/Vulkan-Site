# VkMutableDescriptorTypeListEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMutableDescriptorTypeListEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMutableDescriptorTypeListEXT - Structure describing descriptor types that a given descriptor may mutate to

The list of potential descriptor types a given mutable descriptor **can**
mutate to is passed in a `VkMutableDescriptorTypeListEXT` structure.

The `VkMutableDescriptorTypeListEXT` structure is defined as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_mutable_descriptor_type
typedef struct VkMutableDescriptorTypeListEXT {
    uint32_t                   descriptorTypeCount;
    const VkDescriptorType*    pDescriptorTypes;
} VkMutableDescriptorTypeListEXT;

// Provided by VK_VALVE_mutable_descriptor_type
// Equivalent to VkMutableDescriptorTypeListEXT
typedef VkMutableDescriptorTypeListEXT VkMutableDescriptorTypeListVALVE;

* 
`descriptorTypeCount` is the number of elements in
`pDescriptorTypes`.

* 
`pDescriptorTypes` is `NULL` or a pointer to an array of
`descriptorTypeCount` [VkDescriptorType](VkDescriptorType.html) values defining which
descriptor types a given binding may mutate to.

Valid Usage

* 
[](#VUID-VkMutableDescriptorTypeListEXT-descriptorTypeCount-04597) VUID-VkMutableDescriptorTypeListEXT-descriptorTypeCount-04597

`descriptorTypeCount` **must** not be `0` if the corresponding binding
is of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04598) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04598

`pDescriptorTypes` **must** be a valid pointer to an array of
`descriptorTypeCount` valid, unique [VkDescriptorType](VkDescriptorType.html) values if
the given binding is of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html) type

* 
[](#VUID-VkMutableDescriptorTypeListEXT-descriptorTypeCount-04599) VUID-VkMutableDescriptorTypeListEXT-descriptorTypeCount-04599

`descriptorTypeCount` **must** be `0` if the corresponding binding is
not of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04600) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04600

`pDescriptorTypes` **must** not contain
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04601) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04601

`pDescriptorTypes` **must** not contain
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04602) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04602

`pDescriptorTypes` **must** not contain
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04603) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04603

`pDescriptorTypes` **must** not contain
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-09696) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-09696

`pDescriptorTypes` **must** not contain
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-parameter) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-parameter

 If `descriptorTypeCount` is not `0`, `pDescriptorTypes` **must** be a valid pointer to an array of `descriptorTypeCount` valid [VkDescriptorType](VkDescriptorType.html) values

[VK_EXT_mutable_descriptor_type](VK_EXT_mutable_descriptor_type.html), [VK_VALVE_mutable_descriptor_type](VK_VALVE_mutable_descriptor_type.html), [VkDescriptorType](VkDescriptorType.html), [VkMutableDescriptorTypeCreateInfoEXT](VkMutableDescriptorTypeCreateInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkMutableDescriptorTypeListEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
