# VK_EXT_inline_uniform_block

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/extensions/VK_EXT_inline_uniform_block.html

## Table of Contents

- [Suggestions](#_suggestions)

## Content

|  | Promoted to core in Vulkan 1.3 |
| --- | --- |

For a common implementation, descriptors are just a table to indirectly point to the data that was bound to it during the recording of the command buffer. The issue is that not all descriptors are created equally, for example, one descriptor might only be a few DWORDS in size.

![VK_EXT_inline_uniform_block_before.png](../_images/extensions/VK_EXT_inline_uniform_block_before.png)

Using `VK_EXT_inline_uniform_block` gives an implementation the opportunity to reduce the number of indirections an implementation takes to access uniform values, when only a few values are used. Unlike push constants, this data can be reused across multiple disjoint sets of draws/dispatches.

![VK_EXT_inline_uniform_block_after.png](../_images/extensions/VK_EXT_inline_uniform_block_after.png)

* 
Make sure to check the `VkPhysicalDeviceInlineUniformBlockPropertiesEXT` struct for the limitation for the implementation’s usage of inline uniform blocks.

* 
Don’t overdo the usage of inlining, otherwise the driver may need to repack them into a buffer, adding CPU overhead and losing the indirection benefit - aim for no more than a few dwords.
