# VkResourceDescriptorDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkResourceDescriptorDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkResourceDescriptorDataEXT - Union specifying resource descriptor types

The `VkResourceDescriptorDataEXT` union is defined as:

// Provided by VK_EXT_descriptor_heap
typedef union VkResourceDescriptorDataEXT {
    const VkImageDescriptorInfoEXT*          pImage;
    const VkTexelBufferDescriptorInfoEXT*    pTexelBuffer;
    const VkDeviceAddressRangeEXT*           pAddressRange;
    const VkTensorViewCreateInfoARM*         pTensorARM;
} VkResourceDescriptorDataEXT;

* 
`pImage` is a pointer to a [VkImageDescriptorInfoEXT](VkImageDescriptorInfoEXT.html) structure.

* 
`pTexelBuffer` is a pointer to a
[VkTexelBufferDescriptorInfoEXT](VkTexelBufferDescriptorInfoEXT.html) structure.

* 
`pAddressRange` is a pointer to a [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html)
structure.

* 
`pTensorARM` is a pointer to a [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html)
structure.

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkImageDescriptorInfoEXT](VkImageDescriptorInfoEXT.html), [VkResourceDescriptorInfoEXT](VkResourceDescriptorInfoEXT.html), [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html), [VkTexelBufferDescriptorInfoEXT](VkTexelBufferDescriptorInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkResourceDescriptorDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
