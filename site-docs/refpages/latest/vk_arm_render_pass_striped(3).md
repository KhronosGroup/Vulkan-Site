# VK_ARM_render_pass_striped(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_render_pass_striped.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_render_pass_striped](#VK_ARM_render_pass_striped)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_render_pass_striped - device extension

**Name String**

`VK_ARM_render_pass_striped`

**Extension Type**

Device extension

**Registered Extension Number**

425

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

         [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_synchronization2](VK_KHR_synchronization2.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_render_pass_striped] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_ARM_render_pass_striped extension*)

**Extension Proposal**

[VK_ARM_render_pass_striped](../../../../features/latest/features/proposals/VK_ARM_render_pass_striped.html)

**Last Modified Date**

2023-11-21

**IP Status**

No known IP claims.

**Contributors**

* 
Jan-Harald Fredriksen, Arm

* 
Lisa Wu, Arm

* 
Torbjorn Nilsson, Arm

* 
Ying-Chieh Chen, Mediatek

* 
Jim Chiu, Mediatek

This extension adds the ability to split a render pass instance into
stripes, and to get a notification when rendering has completed for each
stripe.

* 
[VkRenderPassStripeInfoARM](VkRenderPassStripeInfoARM.html)

* 
Extending [VkCommandBufferSubmitInfo](VkCommandBufferSubmitInfo.html):

[VkRenderPassStripeSubmitInfoARM](VkRenderPassStripeSubmitInfoARM.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceRenderPassStripedFeaturesARM](VkPhysicalDeviceRenderPassStripedFeaturesARM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceRenderPassStripedPropertiesARM](VkPhysicalDeviceRenderPassStripedPropertiesARM.html)

Extending [VkRenderingInfo](VkRenderingInfo.html), [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html):

* 
[VkRenderPassStripeBeginInfoARM](VkRenderPassStripeBeginInfoARM.html)

* 
`VK_ARM_RENDER_PASS_STRIPED_EXTENSION_NAME`

* 
`VK_ARM_RENDER_PASS_STRIPED_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RENDER_PASS_STRIPED_FEATURES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RENDER_PASS_STRIPED_PROPERTIES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_BEGIN_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_SUBMIT_INFO_ARM](VkStructureType.html)

None.

* 
Revision 1, 2023-11-21

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_render_pass_striped).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
