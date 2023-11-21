import pygame, sys
from pygame.locals import *
import random
from math import sin, cos

pygame.init()

FPS = 30
FramePerSec = pygame.time.Clock()

WHITE = (255, 255, 255)

# Screen information
screen_width = 800
screen_height = 600

screen = pygame.display.set_mode((screen_width, screen_height))
screen.fill(WHITE)
pygame.display.set_caption("BoidsInnit")

class PreyBoid(pygame.sprite.Sprite):

    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.image.load("PreyImg.png")
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y

    def update(self):
        ## Boid screen loop
        # Y
        if self.rect.centery < 0:
            self.rect.centery = screen_height
        elif self.rect.centery > screen_height:
            self.rect.centery = 0
        # X
        if self.rect.centerx < 0:
            self.rect.centerx = screen_width
        elif self.rect.centerx > screen_width:
            self.rect.centerx = 0
        ##


preySprites = []

# Create multiple instances of sprites based on a num_sprites
num_sprites = 10  # Change this number to control how many PreyBoids spawn
for _ in range(num_sprites):
    randx = random.randint(0, screen_width)
    randy = random.randint(0, screen_height)
    tempsprite = PreyBoid(randx, randy)
    preySprites.append(tempsprite)

# Game Loop
while True:
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()

    for sprite in preySprites:
        sprite.update()

    screen.fill(WHITE)

    for sprite in preySprites:
        screen.blit(sprite.image, sprite.rect)

    pygame.display.update()
    FramePerSec.tick(FPS)