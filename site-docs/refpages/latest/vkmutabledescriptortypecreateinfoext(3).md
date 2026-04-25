# VkMutableDescriptorTypeCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMutableDescriptorTypeCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMutableDescriptorTypeCreateInfoEXT - Structure describing the list of possible active descriptor types for mutable type descriptors

If the `pNext` chain of a [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html) or
[VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html) structure includes a
[VkMutableDescriptorTypeCreateInfoEXT](#) structure, then that structure
specifies Information about the possible descriptor types for mutable
descriptor types.

The `VkMutableDescriptorTypeCreateInfoEXT` structure is defined as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_mutable_descriptor_type
typedef struct VkMutableDescriptorTypeCreateInfoEXT {
    VkStructureType                          sType;
    const void*                              pNext;
    uint32_t                                 mutableDescriptorTypeListCount;
    const VkMutableDescriptorTypeListEXT*    pMutableDescriptorTypeLists;
} VkMutableDescriptorTypeCreateInfoEXT;

// Provided by VK_VALVE_mutable_descriptor_type
// Equivalent to VkMutableDescriptorTypeCreateInfoEXT
typedef VkMutableDescriptorTypeCreateInfoEXT VkMutableDescriptorTypeCreateInfoVALVE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mutableDescriptorTypeListCount` is the number of elements in
`pMutableDescriptorTypeLists`.

* 
`pMutableDescriptorTypeLists` is a pointer to an array of
`VkMutableDescriptorTypeListEXT` structures.

If `mutableDescriptorTypeListCount` is zero or if this structure is not
included in the `pNext` chain, the [VkMutableDescriptorTypeListEXT](VkMutableDescriptorTypeListEXT.html)
for each element is considered to be zero or `NULL` for each member.
Otherwise, the descriptor set layout binding at
[VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html)::`pBindings`[i] uses the
descriptor type lists in
[VkMutableDescriptorTypeCreateInfoEXT](#)::`pMutableDescriptorTypeLists`[i].

Valid Usage (Implicit)

* 
[](#VUID-VkMutableDescriptorTypeCreateInfoEXT-sType-sType) VUID-VkMutableDescriptorTypeCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MUTABLE_DESCRIPTOR_TYPE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkMutableDescriptorTypeCreateInfoEXT-pMutableDescriptorTypeLists-parameter) VUID-VkMutableDescriptorTypeCreateInfoEXT-pMutableDescriptorTypeLists-parameter

 If `mutableDescriptorTypeListCount` is not `0`, `pMutableDescriptorTypeLists` **must** be a valid pointer to an array of `mutableDescriptorTypeListCount` valid [VkMutableDescriptorTypeListEXT](VkMutableDescriptorTypeListEXT.html) structures

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)

* 
[VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html)

[VK_EXT_mutable_descriptor_type](VK_EXT_mutable_descriptor_type.html), [VK_VALVE_mutable_descriptor_type](VK_VALVE_mutable_descriptor_type.html), [VkMutableDescriptorTypeListEXT](VkMutableDescriptorTypeListEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkMutableDescriptorTypeCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
