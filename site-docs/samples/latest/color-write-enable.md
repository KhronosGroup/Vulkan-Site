# Color write enable

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/color_write_enable/README.html

## Table of Contents

- [Overview](#_overview)
- [How to use in Vulkan](#_how_to_use_in_vulkan)
- [How_to_use_in_Vulkan](#_how_to_use_in_vulkan)
- [The sample](#_the_sample)
- [Documentation links](#_documentation_links)
- [See also](#_see_also)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/color_write_enable). |
| --- | --- |

This sample demonstrates how to use the `VK_EXT_color_write_enable` extension.
This extension allows to toggle the output color attachments using a pipeline dynamic state.
It allows the program to prepare an additional framebuffer populated with the data from a defined color blend attachment which can be blended dynamically to the final scene.

The final results are comparable to those obtained with `vkCmdSetColorWriteMaskEXT`, but it does not require the GPU driver to support `VK_EXT_extended_dynamic_state3`.

To use this feature, the device extension VK_EXT_COLOR_WRITE_ENABLE_EXTENSION_NAME has to be enabled.
Support of this feature can be queried by extending the struct VkPhysicalDeviceFeatures2 in the vkGetPhysicalDeviceFeatures2 call by a VkPhysicalDeviceColorWriteEnableFeaturesEXT struct.
`VkPipelineColorWriteCreateInfoEXT` contains an array of Boolean values that serve as toggles for the corresponding `VkPipelineColorBlendAttachmentState`.
This array can be overwritten dynamically with the `vkCmdSetColorWriteEnableEXT` function.

Two subpasses are performed in the sample.
In the first subpass, three attachments are used.
Each attachment has only one color component bit enabled - R, G and B.
A triangle is drawn on each of them separately.
The second subpass combines three images created in the previous pass.
Checkboxes are used to toggle the `vkCmdSetColorWriteEnableEXT` function disabling each attachment.
As a result of its disabling, the value of a given channel is set as the value of that channel in the background color.
Sliders are used to set the background color.

The sample shows how to setup an application to work with this extension:

* 
How to enable the extension.

* 
How to set up multiple color attachments in the color blend state.

* 
How to set up the render subpass and framebuffers for multiple color attachments.

* 
How to write a fragment shader with multiple outputs.

[https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_color_write_enable.html](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_color_write_enable.html)

[https://registry.khronos.org/vulkan/specs/latest/man/html/VkSubpassDescription.html](https://registry.khronos.org/vulkan/specs/latest/man/html/VkSubpassDescription.html)

[https://registry.khronos.org/vulkan/specs/latest/man/html/VkFramebufferCreateInfo.html](https://registry.khronos.org/vulkan/specs/latest/man/html/VkFramebufferCreateInfo.html)

[https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetColorWriteMaskEXT.html](https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetColorWriteMaskEXT.html)
