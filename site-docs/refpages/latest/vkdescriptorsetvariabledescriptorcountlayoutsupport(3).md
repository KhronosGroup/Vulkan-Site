# VkDescriptorSetVariableDescriptorCountLayoutSupport(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSetVariableDescriptorCountLayoutSupport.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSetVariableDescriptorCountLayoutSupport - Structure returning information about whether a descriptor set layout can be supported

If the `pNext` chain of a [VkDescriptorSetLayoutSupport](VkDescriptorSetLayoutSupport.html) structure
includes a `VkDescriptorSetVariableDescriptorCountLayoutSupport`
structure, then that structure returns additional information about whether
the descriptor set layout is supported.

// Provided by VK_VERSION_1_2
typedef struct VkDescriptorSetVariableDescriptorCountLayoutSupport {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxVariableDescriptorCount;
} VkDescriptorSetVariableDescriptorCountLayoutSupport;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkDescriptorSetVariableDescriptorCountLayoutSupport
typedef VkDescriptorSetVariableDescriptorCountLayoutSupport VkDescriptorSetVariableDescriptorCountLayoutSupportEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxVariableDescriptorCount` indicates the maximum number of
descriptors supported in the highest numbered binding of the layout, if
that binding is variable-sized.
If the highest numbered binding of the layout has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) then
`maxVariableDescriptorCount` indicates the maximum byte size
supported for the binding, if that binding is variable-sized.

If the [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html) structure specified in
[vkGetDescriptorSetLayoutSupport](vkGetDescriptorSetLayoutSupport.html)::`pCreateInfo` includes a
variable-sized descriptor, then `supported` is determined assuming the
requested size of the variable-sized descriptor, and
`maxVariableDescriptorCount` is the maximum size of that descriptor that
**can** be successfully created (which is greater than or equal to the
requested size passed in).
If the [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html) structure does not include a
variable-sized descriptor, or if the
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html)::`descriptorBindingVariableDescriptorCount`
feature is not enabled, then `maxVariableDescriptorCount` is zero.
For the purposes of this command, a variable-sized descriptor binding with a
`descriptorCount` of zero is treated as having a `descriptorCount`
of
four if `descriptorType` is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html), or one otherwise,
and thus the binding is not ignored and the maximum descriptor count will be
returned.
If the layout is not supported, then the value written to
`maxVariableDescriptorCount` is **undefined**.

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetVariableDescriptorCountLayoutSupport-sType-sType) VUID-VkDescriptorSetVariableDescriptorCountLayoutSupport-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_LAYOUT_SUPPORT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorSetLayoutSupport](VkDescriptorSetLayoutSupport.html)

[VK_EXT_descriptor_indexing](VK_EXT_descriptor_indexing.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorSetVariableDescriptorCountLayoutSupport).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
